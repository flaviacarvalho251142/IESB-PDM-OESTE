export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

function diasAtras(qtd) {
  const d = new Date();
  d.setDate(d.getDate() - qtd);
  return d;
}

export const DUMMY_DESPESAS = [
  { id: '1', descricao: 'Conta de luz', valor: 100.99, data: diasAtras(10), categoria: 'Contas' },
  { id: '2', descricao: 'Conta de água', valor: 40.99, data: diasAtras(2), categoria: 'Contas' },
  { id: '3', descricao: 'Almoço', valor: 35.5, data: diasAtras(1), categoria: 'Alimentação' },
  { id: '4', descricao: 'Uber', valor: 28.9, data: diasAtras(3), categoria: 'Transporte' },
  { id: '5', descricao: 'Cinema', valor: 60, data: diasAtras(5), categoria: 'Lazer' },
  { id: '6', descricao: 'Mercado', valor: 150.75, data: diasAtras(20), categoria: 'Alimentação' },
];