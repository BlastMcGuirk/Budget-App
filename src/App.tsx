import BudgetPage from './pages/BudgetPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BudgetPage" component={BudgetPage} options={{
          title: "Budget Buddy"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

