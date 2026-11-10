import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

/** Modal de nova tarefa. */
export default function NewTaskScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
});