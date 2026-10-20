import { useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';
import { DUMMY_DESPESAS } from '../data/despesas';

function filtrarPorCategoria(despesas, categoria) {
  if (categoria === 'Todas') {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

function TodasDespesas() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(DUMMY_DESPESAS, categoriaSelecionada);

  return (
    <View style={{ flex: 1 }}>
      <FiltroCategoria
        categoriaSelecionada={categoriaSelecionada}
        onSelecionar={setCategoriaSelecionada}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaSelecionada === 'Todas' ? 'Total' : categoriaSelecionada}
      />
    </View>
  );
}

export default TodasDespesas;