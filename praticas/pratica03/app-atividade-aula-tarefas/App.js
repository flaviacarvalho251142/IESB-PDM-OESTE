import { StyleSheet, View, Image, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetasList from './components/MetasList';
import MetaInput from './components/MetasInput';

export default function App() {

  const [metas, setMetas] = useState([]);

  // Carrega a lista salva quando o app abre
  useEffect(() => {
    async function carregarMetas() {
      const metasSalvas = await AsyncStorage.getItem('listaMetas');
      if (metasSalvas) {
        setMetas(JSON.parse(metasSalvas));
      }
    }
    carregarMetas();
  }, []);

  // Salva a lista toda vez que ela mudar
  useEffect(() => {
    AsyncStorage.setItem('listaMetas', JSON.stringify(metas));
  }, [metas]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = { id: Math.random().toString(), texto: inputMeta };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    const novasMetas = metas.filter(meta => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
  <Image
    source={require('./assets/logo.png.png')}
    style={styles.logo}
  />
  <Text style={styles.titulo}>Minhas Metas</Text>
</View>

        <View style={styles.mainContainer}>
          <MetaInput onAddMeta={adicionarMetaHandler} />
          <View style={styles.metaContainer}>
            <MetasList
              array={metas}
              onDeleteItem={deletarMetaHandler}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  metaContainer: {
    flex: 1,
    marginTop: 16,
  },
});