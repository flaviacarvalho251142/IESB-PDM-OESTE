import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia, botaoRemover }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
        ListEmptyComponent={<Text style={styles.textoVazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemTexto}>
              <Text style={styles.itemTitulo}>{item.texto}</Text>
              <Text style={styles.itemData}>{item.criadoEm}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressed,
              ]}
              android_ripple={{ color: '#ffffff55' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.textoBotaoRemover}>{botaoRemover}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    color: '#888',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  itemTexto: {
    flex: 1,
    marginRight: 8,
  },
  itemTitulo: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemData: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: '#dc2626',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botaoRemoverPressed: {
    opacity: 0.7,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});