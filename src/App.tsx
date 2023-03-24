import Home from './pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BudgetDetails, { BudgetDetailsProps } from './pages/BudgetDetails';
import NewEntry, { NewEntryProps } from './pages/NewEntry';
import { ItemDetails, ItemDetailsProps } from './pages/ItemDetails';
import { setupStore } from './redux/store'
import { Provider } from 'react-redux'
import EditItem, { EditItemProps } from './pages/EditItem';

// Navigation
export type RootStackParamList = {
  Home: undefined;
  BudgetDetails: BudgetDetailsProps;
  NewEntry: NewEntryProps;
  ItemDetails: ItemDetailsProps;
  EditItem: EditItemProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={setupStore()}>
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
        <Stack.Screen name="ItemDetails" component={ItemDetails} options={{
          title: "Item Details"
        }} />
        <Stack.Screen name="EditItem" component={EditItem} options={{
          title: "Edit Item"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

