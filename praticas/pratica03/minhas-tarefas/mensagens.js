import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export const rotulo_input_meta = "Digite a sua meta";
export const rotulo_btn_cadastro_meta = "Adicionar";
export const rotulo_lista_metas = "Lista de metas";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{rotulo_lista_metas}</Text>
      <Text style={{ margin: 20 }}>{rotulo_input_meta}</Text>
      <Text style={styles.text}>AAA</Text>
      <Button title={rotulo_btn_cadastro_meta} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
  },
});