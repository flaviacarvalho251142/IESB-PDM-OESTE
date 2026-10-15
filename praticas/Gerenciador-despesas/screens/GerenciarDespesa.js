import { View, Text, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../data/despesas';

function GerenciarDespesa() {
  const navigation = useNavigation();

  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [erro, setErro] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);
    if (match) {
      setValor(cleanText);
    }
  };

  const handleSalvar = () => {
    if (descricao.trim() === '' || valor === '' || categoria === '') {
      setErro('Preencha descrição, valor e categoria.');
      return;
    }
    if (parseFloat(valor) <= 0) {
      setErro('O valor deve ser maior que zero.');
      return;
    }

    setErro('');
    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      data,
      categoria,
    };
    console.log('Nova despesa:', novaDespesa);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategoria(cat)}
              style={[styles.chip, categoria === cat && styles.chipAtivo]}
            >
              <Text style={[styles.chipText, categoria === cat && styles.chipTextAtivo]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  erro: {
    color: 'red',
    marginBottom: 8,
    marginHorizontal: 4,
  },
});
