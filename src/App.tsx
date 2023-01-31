import Home from './pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BudgetDetails, { BudgetDetailsProps } from './pages/BudgetDetails';

export type RootStackParamList = {
  Home: undefined;
  BudgetDetails: BudgetDetailsProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title: "Budget Buddy"
        }} />
        <Stack.Screen name="BudgetDetails" component={BudgetDetails} options={{
          title: "Details"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

