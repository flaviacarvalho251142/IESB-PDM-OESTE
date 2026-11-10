import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.formRow}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botaoAdicionar,
          pressed && styles.botaoAdicionarPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={onAdd}
      >
        <Text style={styles.textoBotao}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  botaoAdicionar: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionarPressed: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
  },
});