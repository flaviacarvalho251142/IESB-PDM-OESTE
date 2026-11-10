import { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const avatar = photoUri ? { uri: photoUri } : require('../../assets/icon.png');

  // Lê a foto salva ao abrir
  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY).then((saved) => {
      if (saved) setPhotoUri(saved);
    });
  }, []);

  /** Salva a nova foto no estado e no AsyncStorage. */
  async function save(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  return (
    <View style={styles.screen}>
      <Pressable onPress={async () => save(await pickImage())}>
        <Image source={avatar} style={styles.avatar} />
      </Pressable>
      <Text style={styles.name}>Maria Souza</Text>
      <View style={styles.row}>
        <Button title="Galeria" onPress={async () => save(await pickImage())} />
        <Button title="Câmera" onPress={async () => save(await takePhoto())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  row: { flexDirection: 'row', gap: 16 },
});