import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  /** Compartilha o resumo de gastos. */
  function shareSummary() {
    Share.share({ message: `Gastei R$ ${total.toFixed(2)} este mês.` });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={shareSummary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  total: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
});