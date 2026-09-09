import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id} 
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
         
          <Pressable style={styles.textArea} onPress={() => onToggle(item.id)}>
            <Text style={[styles.itemText, item.concluida && styles.itemTextDone]}>
              {item.texto}
            </Text>
            <Text style={styles.itemDate}>
              {new Date(item.criadaEm).toLocaleDateString()}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#f5b5b5' }}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  textArea: {
    flex: 1,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#202020',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  itemDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#ef449a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});