import Home from './pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BudgetDetails, { BudgetDetailsProps } from './pages/BudgetDetails';
import NewEntry, { NewEntryProps } from './pages/NewEntry';
import { ItemDetails, ItemDetailsProps } from './pages/ItemDetails';
import { setupStore } from './redux/store'
import { Provider } from 'react-redux'
import EditItem, { EditItemProps } from './pages/EditItem';
import EditBudget, { EditBudgetProps } from './pages/EditBudget';

// Navigation
export type RootStackParamList = {
  Home: undefined;
  BudgetDetails: BudgetDetailsProps;
  NewEntry: NewEntryProps;
  ItemDetails: ItemDetailsProps;
  EditItem: EditItemProps;
  EditBudget: EditBudgetProps;
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
          title: "Budget Details"
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
        <Stack.Screen name="EditBudget" component={EditBudget} options={{
          title: "Edit Budget"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

