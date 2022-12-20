import renderer from 'react-test-renderer';
import ListItem, { Item } from '../ListItem';

describe("List Item Tests", () => {

    const itemWithCategory: Item = {
        name: "Item",
        amount: 12.34,
        date: "1/1/22",
        category: "Category"
    }
    
    const itemWithoutCategory: Item = {
        name: "Item",
        amount: 12.34,
        date: "1/1/22",
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