import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false); 

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar as metas salvas.');
        console.log('Erro ao carregar:', erro);
      } finally {
        setCarregado(true); 
      }
    }
    carregarMetas();
  }, []); 

 
  useEffect(() => {
    if (!carregado) return; 

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar as metas.');
        console.log('Erro ao salvar:', erro);
      }
    }
    salvarMetas();
  }, [metas]); 

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };


    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function alternarConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }


  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/favicon.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.counter}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={adicionarMeta} />

        <MetaList metas={metas} onDelete={removerMeta} onToggle={alternarConcluida} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  counter: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});