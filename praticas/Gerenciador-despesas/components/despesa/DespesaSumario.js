import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.valor, somaDespesas > 200 && styles.valorAlto]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: 'darkgray',
  },
  periodo: {
    color: 'white',
    fontWeight: 'bold',
  },
  valor: {
    color: 'white',
    fontWeight: 'bold',
  },
  valorAlto: {
    color: 'red',
  },
});