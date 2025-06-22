import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AudioScreen({ navigation }) {
  const [audioFiles, setAudioFiles] = useState([]);
  const [sound, setSound] = useState(null);
  const [durations, setDurations] = useState({});
  const [importantFlags, setImportantFlags] = useState({});

  useEffect(() => {
    const loadAudioFiles = async () => {
      const dir = FileSystem.documentDirectory + 'audios/';
      try {
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        }
        const files = await FileSystem.readDirectoryAsync(dir);
        const fullPaths = files.map((file) => `${dir}${file}`);
        setAudioFiles(fullPaths);

        for (let uri of fullPaths) {
          const { sound } = await Audio.Sound.createAsync({ uri }, {}, null, false);
          const status = await sound.getStatusAsync();
          setDurations(prev => ({ ...prev, [uri]: status.durationMillis }));
          await sound.unloadAsync();
        }
      } catch (err) {
        console.log('Erro ao ler diretório:', err);
      }
    };

    loadAudioFiles();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playAudio = async (uri) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  const toggleImportant = (uri) => {
    setImportantFlags(prev => ({ ...prev, [uri]: !prev[uri] }));
  };

  const shareAudio = async (uri) => {
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        alert('O compartilhamento de arquivos não está disponível neste dispositivo.');
        return;
      }

      await Sharing.shareAsync(uri, {
        dialogTitle: 'Compartilhar gravação de áudio',
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  };

  const formatDateTime = (uri) => {
    const filename = uri.split('/').pop().replace('.m4a', '');
    const timestamp = parseInt(filename.replace('gravacao_', ''));
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return filename;
  };

  const formatDuration = (millis) => {
    if (!millis) return '...';
    const totalSec = Math.floor(millis / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}m ${sec}s`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => playAudio(item)} style={styles.playButton}>
        <View style={styles.playCircle}>
          <Icon name="play" size={20} color="#4A1A6D" />
        </View>
      </TouchableOpacity>

      <View style={styles.audioInfo}>
        <Text style={styles.dateText}>{formatDateTime(item)}</Text>
        <Text style={styles.durationText}>{formatDuration(durations[item])}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => toggleImportant(item)} style={styles.iconButton}>
          <Icon
            name="flag"
            size={20}
            color={importantFlags[item] ? '#FFD700' : '#FFF'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareAudio(item)} style={styles.iconButton}>
          <Icon name="share-alt" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gravações</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.headerBorder} />

      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum áudio encontrado.</Text>}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
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
  logo: {
    width: 50,
    height: 50,
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
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  playButton: {
    marginRight: 12,
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  durationText: {
    fontSize: 14,
    color: '#EEE',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
