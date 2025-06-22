import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GuardioesScreen({ navigation }) {
  const [guardioes, setGuardioes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [novoGuardiao, setNovoGuardiao] = useState({
    nome: '',
    telefone: '',
    email: '',
    relacao: '',
  });

  useEffect(() => {
    carregarGuardioes();
  }, []);

  const carregarGuardioes = async () => {
    try {
      const data = await AsyncStorage.getItem('guardioes');
      if (data) setGuardioes(JSON.parse(data));
    } catch (error) {
      console.error('Erro ao carregar guardiões:', error);
    }
  };

  const salvarGuardioes = async (lista) => {
    try {
      await AsyncStorage.setItem('guardioes', JSON.stringify(lista));
    } catch (error) {
      console.error('Erro ao salvar guardiões:', error);
    }
  };

  const formatarTelefone = (valor) => {
    let tel = valor.replace(/\D/g, '');
    if (tel.length <= 2) return `(${tel}`;
    if (tel.length <= 6) return `(${tel.slice(0, 2)}) ${tel.slice(2)}`;
    if (tel.length <= 10) return `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`;
    return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7, 11)}`;
  };

  const handleSalvar = async () => {
    const { nome, telefone, email, relacao } = novoGuardiao;

    if (!nome || !telefone || !relacao) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, telefone e relação.');
      return;
    }

    const telefoneFormatado = formatarTelefone(telefone);
    const duplicado = guardioes.find(
      (g, i) => g.telefone === telefoneFormatado && i !== editandoIndex
    );

    if (duplicado) {
      Alert.alert('Duplicado', 'Este telefone já está cadastrado.');
      return;
    }

    const guardiaoAtualizado = {
      nome,
      telefone: telefoneFormatado,
      email,
      relacao,
    };

    let novaLista;
    if (editandoIndex !== null) {
      novaLista = [...guardioes];
      novaLista[editandoIndex] = guardiaoAtualizado;
    } else {
      novaLista = [...guardioes, guardiaoAtualizado];
    }

    setGuardioes(novaLista);
    await salvarGuardioes(novaLista);

    setNovoGuardiao({ nome: '', telefone: '', email: '', relacao: '' });
    setEditandoIndex(null);
    setModalVisible(false);
  };

  const handleEditar = (index) => {
    const g = guardioes[index];
    setNovoGuardiao({
      nome: g.nome,
      telefone: g.telefone.replace(/\D/g, ''),
      email: g.email || '',
      relacao: g.relacao || '',
    });
    setEditandoIndex(index);
    setModalVisible(true);
  };

  const handleExcluir = (index) => {
    Alert.alert('Confirmação', 'Deseja excluir este guardião?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const novaLista = guardioes.filter((_, i) => i !== index);
          setGuardioes(novaLista);
          await salvarGuardioes(novaLista);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.telefone}>{item.telefone}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEditar(index)} style={styles.acaoBotao}>
        <Icon name="edit" size={20} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleExcluir(index)} style={styles.acaoBotao}>
        <Icon name="trash" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guardiões</Text>
        <Icon name="users" size={24} color="#FFF" />
      </View>

      <View style={styles.headerBorder} />

      {/* Lista */}
      <FlatList
        data={guardioes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum guardião adicionado.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setEditandoIndex(null);
          setNovoGuardiao({ nome: '', telefone: '', email: '', relacao: '' });
          setModalVisible(true);
        }}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editandoIndex !== null ? 'Editar Guardião' : 'Novo Guardião'}
            </Text>

            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={novoGuardiao.nome}
              onChangeText={(text) => setNovoGuardiao({ ...novoGuardiao, nome: text })}
            />
            <TextInput
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={styles.input}
              maxLength={15}
              value={novoGuardiao.telefone}
              onChangeText={(text) =>
                setNovoGuardiao({ ...novoGuardiao, telefone: text.replace(/\D/g, '') })
              }
            />
            <TextInput
              placeholder="E-mail (opcional)"
              keyboardType="email-address"
              style={styles.input}
              value={novoGuardiao.email}
              onChangeText={(text) => setNovoGuardiao({ ...novoGuardiao, email: text })}
            />
            <TextInput
              placeholder="Relação (ex: Mãe, Amigo)"
              style={styles.input}
              value={novoGuardiao.relacao}
              onChangeText={(text) => setNovoGuardiao({ ...novoGuardiao, relacao: text })}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setEditandoIndex(null);
                  setNovoGuardiao({ nome: '', telefone: '', email: '', relacao: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A1A6D',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerBorder: {
    height: 2,
    backgroundColor: '#FFF',
    width: '100%',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A167BA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  telefone: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 10,
  },
  emptyText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    backgroundColor: '#A167BA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  acaoBotao: {
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A1A6D',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#AAA',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFF',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4A1A6D',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
