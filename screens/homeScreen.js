import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState('');
  const recordingRef = useRef(null);

  const requestPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Ative o microfone nas configurações.');
      return false;
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  };

  const stopRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const audioDir = FileSystem.documentDirectory + 'audios/';
      const dirInfo = await FileSystem.getInfoAsync(audioDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
      }

      const filename = `gravacao_${Date.now()}.m4a`;
      const newPath = audioDir + filename;

      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });

      setRecordedUri(newPath);
      setIsRecording(false);
      Alert.alert('Gravação salva', filename);
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
      Alert.alert('Erro', 'Não foi possível parar a gravação.');
    }
  };

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const handleAlertarGuardioes = async () => {
    try {
      const guardioesData = await AsyncStorage.getItem('guardioes');
      const guardioes = guardioesData ? JSON.parse(guardioesData) : [];

      if (guardioes.length === 0) {
        Alert.alert('Nenhum Guardião', 'Cadastre pelo menos um guardião antes de alertar.');
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita acesso à localização nas configurações.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const linkMaps = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      const mensagem = `🚨 Alerta de Emergência 🚨\n\nPreciso de ajuda! Minha localização é:\n${linkMaps}`;

      const primeiroGuardiao = guardioes[0];
      const telefone = primeiroGuardiao.telefone.replace(/\D/g, '');
      const urlWhats = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

      Linking.openURL(urlWhats);
    } catch (error) {
      console.error('Erro ao alertar guardiões:', error);
      Alert.alert('Erro', 'Não foi possível enviar o alerta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Aviso */}
        <View style={styles.alertBox}>
          <Icon name="exclamation-triangle" size={26} color="#fff" style={styles.alertIcon} />
          <Text style={styles.alertText}>
            Se o agressor estiver armado com arma de fogo, faca ou objetos, chame a polícia imediatamente.
          </Text>
        </View>

        {/* Botão Emergência */}
        <TouchableOpacity
          style={styles.emergencyButton}
          activeOpacity={0.8}
          onPress={() => Linking.openURL('tel:190')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.emergencyText}>Emergência</Text>
            <View style={styles.iconRightWrapper}>
              <View style={styles.rightHalfCircle} />
              <Icon name="phone" size={60} color="#D32F2F" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Botões Secundários */}
        <View style={styles.secondaryButtons}>
          {/* Botão Alertar Guardiões */}
          <TouchableOpacity style={styles.guardianButton} activeOpacity={0.8} onPress={handleAlertarGuardioes}>
            <View style={styles.buttonContent}>
              <Text style={styles.secondaryText}>Alertar Guardiões</Text>
              <View style={styles.iconRightWrapper}>
                <View style={styles.rightHalfCircleCyan} />
                <Icon name="user" size={40} color="#00ACC1" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Botão Gravação */}
          <TouchableOpacity style={styles.recordButton} activeOpacity={0.8} onPress={toggleRecording}>
            <View style={styles.buttonContent}>
              <Text style={styles.secondaryText}>
                {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
              </Text>
              <View style={styles.iconRightWrapper}>
                <View style={styles.rightHalfCircleGreen} />
                <Icon name="microphone" size={40} color="#2E7D32" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A1A6D',
    paddingHorizontal: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  logo: {
    width: 120,
    height: 120,
  },
  alertBox: {
    backgroundColor: '#9C27B0',
    borderRadius: 14,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    marginHorizontal: -30,
  },
  alertIcon: {
    marginRight: 15,
  },
  alertText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    height: 180,
    borderRadius: 18,
    justifyContent: 'center',
    marginBottom: 22,
    elevation: 6,
    overflow: 'hidden',
  },
  guardianButton: {
    backgroundColor: '#00BCD4',
    flex: 1,
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 6,
  },
  recordButton: {
    backgroundColor: '#388E3C',
    flex: 1,
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    marginLeft: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingLeft: 16,
    height: '100%',
  },
  emergencyText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginRight: 25,
  },
  secondaryText: {
    color: '#fff',
    fontSize: 14.5,
    fontWeight: '600',
    flex: 1,
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginRight: 25,
  },
  iconRightWrapper: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rightHalfCircle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFCDD2',
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
  },
  rightHalfCircleCyan: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#B2EBF2',
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
  },
  rightHalfCircleGreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#C8E6C9',
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
