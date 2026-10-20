import { useMemo, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import DespesaLista from '../components/despesa/DespesaLista';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((e) => e.description.toLowerCase().includes(term));
  }, [expenses, debouncedSearch]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.textMuted}
        style={{
          margin: 16,
          marginBottom: 0,
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.inputBg,
          color: theme.text,
        }}
      />
      <DespesaLista
        expenses={filtered}
        label={isSearching ? 'Resultado da busca' : 'Todas as despesas'}
        emptyMessage={
          isSearching
            ? { title: 'Nada encontrado', hint: 'Tente outro termo de busca.' }
            : { title: 'Nenhuma despesa', hint: 'Toque em + para adicionar.' }
        }
      />
    </View>
  );
}