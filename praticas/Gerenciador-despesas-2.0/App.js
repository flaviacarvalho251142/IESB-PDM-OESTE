import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ExpensesContextProvider } from './src/store/expenses-context';
import { useTheme } from './src/constants/theme';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ExpensesTabs() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Ionicons name="add" size={28} color={theme.text} />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

function Navigation() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style={theme.statusBar} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Tabs" component={ExpensesTabs} options={{ headerShown: false }} />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <Navigation />
    </ExpensesContextProvider>
  );
}