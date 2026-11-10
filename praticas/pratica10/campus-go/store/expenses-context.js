import { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@expenses';
const ExpensesContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'set': return action.payload;
    case 'add': return [...state, action.payload];
    case 'remove': return state.filter((e) => e.id !== action.id);
    default: return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) dispatch({ type: 'set', payload: JSON.parse(raw) });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(KEY, JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpensesContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpensesContext);