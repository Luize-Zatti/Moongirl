import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function settingsScreen({ navigation }) {
  const [usuario, setUsuario] = useState('Usuário');
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(usuario);

  const handleSalvarNome = () => {
    if (!novoNome.trim()) {
      Alert.alert('Nome inválido', 'O nome não pode estar vazio.');
      return;
    }
    setUsuario(novoNome.trim());
    setEditando(false);
    Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
  };

  const handleSair = () => {
    Alert.alert('Sair', 'Deseja mesmo sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Você saiu', 'Até logo!');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <Icon name="cogs" size={24} color="#FFF" />
      </View>

      <View style={styles.headerBorder} />

      {/* Nome de usuário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>

        <View style={styles.item}>
          <Icon name="user" size={20} color="#FFF" style={styles.itemIcon} />
          {editando ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={novoNome}
                onChangeText={setNovoNome}
              />
              <TouchableOpacity onPress={handleSalvarNome}>
                <Icon name="check" size={20} color="#FFF" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.itemText}>Olá, {usuario}</Text>
              <TouchableOpacity onPress={() => setEditando(true)}>
                <Icon name="pencil" size={18} color="#FFF" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Sobre e Sair */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outros</Text>

        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Sobre', 'Versão 1.0\nApp de suporte e segurança.')}>
          <Icon name="info-circle" size={20} color="#FFF" style={styles.itemIcon} />
          <Text style={styles.itemText}>Sobre o app</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleSair}>
          <Icon name="sign-out" size={20} color="#FFF" style={styles.itemIcon} />
          <Text style={styles.itemText}>Sair</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A167BA',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flex: 1,
    marginRight: 10,
  },
});
