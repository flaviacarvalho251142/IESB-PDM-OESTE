import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import IconButton from './Components/IconButton.js';
import DespesasRecentes from './screens/Despesas Recentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={BottomTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}