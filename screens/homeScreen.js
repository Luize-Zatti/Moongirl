import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Topo com logo */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        {/* Aviso de emergência */}
         <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠ <Text style={styles.warningTitle}>Perigo imediato:</Text> Se o agressor estiver armado ou apresentar risco grave, chame a polícia e mantenha distância.
          </Text>
        </View>

        {/* Botão de emergência */}
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyText}>Emergência</Text>
          <MaterialIcons name="call" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Botões menores */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.buttonText}>Alertar{'\n'}Guardiões</Text>
            <Ionicons name="person-circle" size={30} color="#003f5c" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.buttonText}>Iniciar{'\n'}gravação</Text>
            <MaterialIcons name="keyboard-voice" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="mic" size={24} color="#fff" />
          <Text style={styles.footerText}>Gravações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="people" size={24} color="#fff" />
          <Text style={styles.footerText}>Guardiões</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="settings" size={24} color="#fff" />
          <Text style={styles.footerText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#512772',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
    marginTop: 50
  },
  warningBox: {
    backgroundColor: '#9b68b4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: -16, // ocupa a largura total
    minHeight: 130, // define uma altura mínima
    justifyContent: 'center', // centraliza o texto verticalmente
  },
  warningText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify', // usa toda a largura de forma uniforme
    width: '100%',        // ocupa 100% da largura do warningBox
  },
  emergencyButton: {
    backgroundColor: '#c40000',
    borderRadius: 15,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  emergencyText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  alertButton: {
    backgroundColor: '#00dbf3',
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#0e721c',
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#9b68b4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
