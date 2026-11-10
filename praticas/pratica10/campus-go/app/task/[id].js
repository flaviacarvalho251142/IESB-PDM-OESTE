import { Button, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

/** Detalhe de uma tarefa a partir do id da URL. */
export default function TaskDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
});