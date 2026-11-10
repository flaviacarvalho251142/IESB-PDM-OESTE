import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [label, setLabel] = useState('Sem check-in');

  /** Check-in com localização aproximada. */
  async function handleCheckIn() {
    const place = await getCurrentPlace();
    if (!place) {
      Alert.alert('Sem localização', 'Permissão negada.');
      return;
    }
    setLabel(place.label);
  }

  /** Confirma a conclusão com vibração de sucesso. */
  async function handleComplete() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.screen}>
      <Link href="/new-task" style={styles.link}>+ Nova tarefa</Link>
      <Link href="/task/42" style={styles.link}>Abrir tarefa 42</Link>
      <Button title="Ver perfil" onPress={() => router.push('/profile')} />

      <View style={styles.gap} />
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      <Text style={styles.label}>{label}</Text>

      <View style={styles.gap} />
      <Button title="Lembrar em 10 s"
        onPress={() => scheduleReminder('Estudar', 10)} />
      <View style={styles.gap} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 60 },
  link: { color: '#4757B8', fontSize: 16, marginBottom: 12 },
  gap: { height: 16 },
  label: { marginTop: 8 },
});