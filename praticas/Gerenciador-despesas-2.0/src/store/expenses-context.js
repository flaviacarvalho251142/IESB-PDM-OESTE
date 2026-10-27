import { createContext, useContext, useEffect, useReducer, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((e) => (e.id === action.payload.id ? { ...e, ...action.payload } : e));
    case 'DELETE':
      return state.filter((e) => e.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) dispatch({ type: 'SET', payload: JSON.parse(stored) });
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const value = useMemo(
    () => ({
      expenses,
      addExpense: (data) =>
        dispatch({
          type: 'ADD',
          payload: { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
        }),
      updateExpense: (id, data) => dispatch({ type: 'UPDATE', payload: { ...data, id } }),
      deleteExpense: (id) => dispatch({ type: 'DELETE', payload: id }),
    }),
    [expenses]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}