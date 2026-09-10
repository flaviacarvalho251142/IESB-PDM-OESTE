import React, { useState } from 'react';
import {View, Text, TextInput,Pressable,Switch,StyleSheet,} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {APP_TITLE, INPUT_PLACEHOLDER,BUTTON_LABEL,LIST_TITLE, SWITCH_LABEL,} from './labels';

const disciplinas = [
  'Métricas e Arquitetura de Software',
  'Programação para Dispositivos Móveis',
  'Engenharia de Software',
  'Aprendizagem de Máquina',
];

export default function App() {

  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            placeholderTextColor="#888"
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>{BUTTON_LABEL}</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
          <Switch
            value={somenteObrigatorias}
            onValueChange={setSomenteObrigatorias}
          />
        </View>
        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.list}>
          {disciplinas.map((nome) => (
            <View key={nome} style={styles.item}>
              <Text style={styles.itemText}>{nome}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },

  button: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },

  buttonPressed: {
    backgroundColor: '#1d4ed8',
    opacity: 0.85,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  switchLabel: {
    fontSize: 14,
    color: '#333',
  },

  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  list: {
  },

  item: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },

  itemText: {
    fontSize: 15,
  },
});