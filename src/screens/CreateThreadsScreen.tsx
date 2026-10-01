import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useThreads } from '../context/ThreadsContext';

export const CreateThreadsScreen = ({ navigation }: any) => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { addThread } = useThreads();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Помилка', 'Потрібен доступ до камери!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (text.trim() || imageUri) {
      addThread(text, imageUri || undefined);
      setText('');
      setImageUri(null);
      navigation.navigate('HomeTab');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Скасувати</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Новий тред</Text>
        <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
          <Text style={styles.postBtnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Розпочніть тред..."
          multiline
          value={text}
          onChangeText={setText}
        />

        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

        <View style={styles.mediaButtons}>
          <TouchableOpacity onPress={pickImage} style={styles.attachBtn}>
            <Text style={styles.attachText}>🖼 Галерея</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.attachBtn}>
            <Text style={styles.attachText}>📷 Зробити фото</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 12, 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#eee' 
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  cancel: { color: '#64748b', fontSize: 15 },
  postBtn: { backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: '#fff', fontWeight: 'bold' },
  inputContainer: { padding: 16 },
  input: { fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
  preview: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  mediaButtons: { flexDirection: 'row', gap: 20, marginTop: 10 },
  attachBtn: { paddingVertical: 8 },
  attachText: { color: '#0066cc', fontWeight: '600', fontSize: 15 },
});