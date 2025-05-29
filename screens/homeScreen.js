import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo no topo */}
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')} // ajuste para seu caminho real
            style={styles.logo}
          />
        </View>

        {/* Caixa de aviso */}
        <View style={styles.warningBox}>
          <MaterialIcons name="warning" size={24} color="#fff" />
          <Text style={styles.warningText}>
            CASO ESTEJA EM UMA SITUAÇÃO DE PERIGO, CLIQUE EM UM DOS BOTÕES ABAIXO!
          </Text>
        </View>

        {/* Botão EMERGÊNCIA */}
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyText}>EMERGÊNCIA</Text>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Linha com dois botões */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.alertButton}>
            <Ionicons name="notifications" size={28} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>ALERTAR{"\n"}GUARDIÕES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton}>
            <FontAwesome5 name="microphone" size={28} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>INICIAR{"\n"}GRAVAÇÃO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#512772',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  warningBox: {
    backgroundColor: '#B48FD1',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  warningText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  emergencyButton: {
    backgroundColor: '#C40000',
    borderRadius: 25,
    paddingVertical: 60, // Aumentado para aumentar a altura
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  alertButton: {
    backgroundColor: '#00DBF3',
    flex: 1,
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    backgroundColor: '#0E721C',
    flex: 1,
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#B48FD1',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    marginTop: 5,
  },
  activeFooterButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: -10,
  },
});
