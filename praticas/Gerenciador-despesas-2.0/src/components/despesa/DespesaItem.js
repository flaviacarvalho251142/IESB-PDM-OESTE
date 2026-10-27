import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../constants/theme';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, shadowColor: theme.shadow },
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16 }}>{expense.description}</Text>
        <Text style={{ color: theme.textMuted, marginTop: 2 }}>
          {new Date(expense.date).toLocaleDateString('pt-BR')} · {expense.category}
        </Text>
      </View>
      <Text style={{ color: theme.primary, fontWeight: 'bold', fontSize: 16 }}>
        R$ {expense.amount.toFixed(2).replace('.', ',')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
});