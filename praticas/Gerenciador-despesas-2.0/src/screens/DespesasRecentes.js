import { useMemo } from 'react';
import { View } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import DespesaLista from '../components/despesa/DespesaLista';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = useTheme();

  const recent = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    limit.setHours(0, 0, 0, 0);
    return expenses.filter((e) => new Date(e.date) >= limit);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaLista
        expenses={recent}
        label="Últimos 7 dias"
        emptyMessage={{ title: 'Nenhuma despesa recente', hint: 'Toque em + para adicionar.' }}
      />
    </View>
  );
}