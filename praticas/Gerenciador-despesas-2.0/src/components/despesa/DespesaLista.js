import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';

export default function DespesaLista({ expenses, label, emptyMessage }) {
  const theme = useTheme();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem expense={item} />}
      ListHeaderComponent={<DespesaSumario expenses={expenses} label={label} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={56} color={theme.textMuted} />
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginTop: 8 }}>
            {emptyMessage?.title ?? 'Nenhuma despesa'}
          </Text>
          <Text style={{ color: theme.textMuted, marginTop: 4, textAlign: 'center' }}>
            {emptyMessage?.hint ?? 'Toque em + para adicionar.'}
          </Text>
        </View>
      }
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', marginTop: 40, paddingHorizontal: 24 },
});