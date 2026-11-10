import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../data/despesas';

function FiltroCategoria({ categoriaSelecionada, onSelecionar }) {
  const opcoes = ['Todas', ...CATEGORIAS];

  return (
    <View style={styles.container}>
      {opcoes.map((cat) => {
        const ativo = categoriaSelecionada === cat;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelecionar(cat)}
            style={[styles.chip, ativo && styles.chipAtivo]}
          >
            <Text style={[styles.chipText, ativo && styles.chipTextAtivo]}>
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default FiltroCategoria;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  chipAtivo: {
    backgroundColor: '#4a56c6',
    borderColor: '#4a56c6',
  },
  chipText: {
    fontSize: 12,
  },
  chipTextAtivo: {
    color: 'white',
  },
});