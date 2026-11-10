import {
  ActivityIndicator, Button, FlatList, StyleSheet, Text, View,
} from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import { FadeIn } from '../../components/FadeIn';

/** Mural de avisos com carregando, erro e sucesso. */
export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Não foi possível carregar: {error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <NoticeCard notice={item} />}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso.</Text>}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

/** Cartão simples para um aviso. */
function NoticeCard({ notice }) {
  return (
    <FadeIn>
      <View style={styles.card}>
        <Text style={styles.title}>{notice.title}</Text>
        <Text numberOfLines={2}>{notice.body}</Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { marginBottom: 12, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 32 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4,
  },
  title: { fontWeight: 'bold', marginBottom: 4 },
});