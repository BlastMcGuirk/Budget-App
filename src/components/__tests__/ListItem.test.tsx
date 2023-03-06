import renderer from 'react-test-renderer';
import { Item } from '../../interfaces/Item';
import ListItem from '../ListItem';

describe("List Item Tests", () => {

    const itemWithCategory: Item = {
        id: 1,
        budgetId: 1,
        name: "Item",
        amount: 12.34,
        day: "1",
        month: "1",
        year: "2022",
        category: "Category"
    }
    
    const itemWithoutCategory: Item = {
        id: 1,
        budgetId: 1,
        name: "Item",
        amount: 12.34,
        day: "1",
        month: "1",
        year: "2022"
    }

    it("Renders correctly with category", () => {
        const tree = renderer
            .create(<ListItem item={itemWithCategory}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders correctly with category", () => {
        const tree = renderer
            .create(<ListItem item={itemWithoutCategory}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});