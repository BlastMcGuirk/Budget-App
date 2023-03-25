import { Home } from './src/pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { BudgetDetails, BudgetDetailsProps } from './src/pages/BudgetDetails';
import { NewEntry, NewEntryProps } from './src/pages/NewEntry';
import { ItemDetails, ItemDetailsProps } from './src/pages/ItemDetails';
import { setupStore } from './src/redux/store'
import { Provider } from 'react-redux'
import { EditItem, EditItemProps } from './src/pages/EditItem';
import { EditBudget, EditBudgetProps } from './src/pages/EditBudget';
import { registerRootComponent } from 'expo';

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

function App() {
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

registerRootComponent(App);
