import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../constants/theme';

export default function DespesaSumario({ expenses, label }) {
  const theme = useTheme();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View>
        <Text style={{ color: theme.textMuted, fontSize: 12 }}>{label}</Text>
        <Text style={{ color: theme.text, fontWeight: '600' }}>
          {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={{ color: theme.primary, fontSize: 18, fontWeight: 'bold' }}>
        R$ {total.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
});