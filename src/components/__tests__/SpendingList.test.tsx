import renderer from 'react-test-renderer';
import SpendingList from '../SpendingList';
import { Item } from '../ListItem';

describe("Spending List Tests", () => {

    const dummyItems: Item[] = [
        {
            name: "Rent",
            category: "Bills",
            amount: 852.25,
            date: "8/4/2022"
        },
        {
            name: "Groceries",
            amount: 130.44,
            date: "8/7/2022"
        }
    ]

    it("Renders correctly", () => {
        const tree = renderer
            .create(<SpendingList budget='name' items={dummyItems} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});