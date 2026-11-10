import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);


  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar seus compromissos.');
      } finally {
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);


  useEffect(() => {
  
    if (!carregado) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar seus compromissos.');
      }
    }

    salvarCompromissos();
  }, [compromissos, carregado]);

  function adicionarCompromisso() {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert(labels.alertaTituloVazio, labels.alertaMensagemVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };


    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function removerCompromisso(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  const pendentes = compromissos.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
   
        <View style={styles.header}>
          <Image
            source={require('./assets/Logo1.png')}
            style={styles.logo}
          />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>{labels.tituloApp}</Text>
            <Text style={styles.contador}>
              {pendentes} {labels.textoContadorPrefixo}
            </Text>
          </View>
        </View>


        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
          botaoRemover={labels.botaoRemover}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  headerTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
  },
  contador: {
    fontSize: 13,
    color: '#4f46e5',
    fontWeight: '600',
    marginTop: 2,
  },
});