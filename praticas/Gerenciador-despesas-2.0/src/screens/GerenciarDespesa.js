import { useLayoutEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, Pressable, Modal, FlatList, ScrollView,
  KeyboardAvoidingView, Platform, Alert, StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';

const AMOUNT_REGEX = /^\d*\.?\d{0,2}$/;

function validate(values) {
  const errors = {};
  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  if (!(parseFloat(values.amount) > 0)) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const [form, setForm] = useState(() => {
    const existing = expenses.find((e) => e.id === expenseId);
    return existing
      ? {
          description: existing.description,
          amount: String(existing.amount),
          date: new Date(existing.date),
          category: existing.category,
        }
      : { description: '', amount: '', date: new Date(), category: '' };
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleAmount(text) {
    const normalized = text.replace(',', '.');
    if (AMOUNT_REGEX.test(normalized)) handleChange('amount', normalized);
  }

  function handleDate(event, selected) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'set' && selected) handleChange('date', selected);
  }

  function handleSave() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  function confirmDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable onPress={confirmDelete}>
              <Ionicons name="trash-outline" size={24} color={theme.danger} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditing, theme]);

  const inputStyle = (field) => [styles.input, errors[field] && styles.inputError];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(t) => handleChange('description', t)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textMuted}
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textMuted}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

        <Text style={styles.label}>Data</Text>
        <Pressable style={inputStyle('date')} onPress={() => setShowPicker((v) => !v)}>
          <Text style={{ color: theme.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDate}
          />
        )}
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}

        <Text style={styles.label}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowModal(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textMuted }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowModal(false)}>
          <View style={styles.sheet}>
            <Text style={[styles.label, { marginTop: 0 }]}>Escolha a categoria</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    handleChange('category', item);
                    setShowModal(false);
                  }}
                >
                  <Text style={{ color: theme.text, fontSize: 16 }}>{item}</Text>
                  {form.category === item && <Ionicons name="checkmark" size={20} color={theme.primary} />}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    label: { color: theme.text, fontWeight: '600', marginTop: 16, marginBottom: 6 },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.inputBg,
      color: theme.text,
      borderRadius: 10,
      padding: 12,
    },
    inputError: { borderColor: theme.danger },
    error: { color: theme.danger, marginTop: 4, fontSize: 13 },
    saveButton: {
      backgroundColor: theme.primary,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 28,
    },
    saveText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
    sheet: {
      backgroundColor: theme.card,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxHeight: '60%',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
  });