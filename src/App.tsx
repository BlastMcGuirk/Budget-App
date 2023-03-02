import Home from './pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BudgetDetails, { BudgetDetailsProps } from './pages/BudgetDetails';
import NewEntry, { NewEntryProps } from './pages/NewEntry';
import { store } from './redux/store'
import { Provider } from 'react-redux'

// Navigation
export type RootStackParamList = {
  Home: undefined;
  BudgetDetails: BudgetDetailsProps;
  NewEntry: NewEntryProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title: "Budget Buddy"
        }} />
        <Stack.Screen name="BudgetDetails" component={BudgetDetails} options={{
          title: "Details"
        }} />
        <Stack.Screen name="NewEntry" component={NewEntry} options={{
          title: "New Entry"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

