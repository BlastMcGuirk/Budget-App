import renderer from 'react-test-renderer';
import BudgetSummary from "../BudgetSummary";
import { Text } from 'react-native';

describe("Budget Summary Tests", () => {

    it("Renders correctly", () => {
        const tree = renderer
            .create(<BudgetSummary budget='name' remaining={1} total={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Capitalizes the budget name", () => {
        const render = renderer.create(<BudgetSummary budget='name' remaining={1} total={1}/>);
        const root = render.root;
        const budgetName = root.findAllByType(Text)[0];
        
        expect(budgetName.props.children).toBe('NAME');
    });

    it("will make positive numbers green", () => {
        const render = renderer.create(<BudgetSummary budget='name' remaining={1} total={1}/>);
        const root = render.root;
        const remaining = root.findAllByType(Text)[1];
        
        expect(remaining.props.style).toContainEqual({color: 'green'});
    });

    it("will make the number 0 green", () => {
        const render = renderer.create(<BudgetSummary budget='name' remaining={0} total={1}/>);
        const root = render.root;
        const remaining = root.findAllByType(Text)[1];
        
        expect(remaining.props.style).toContainEqual({color: 'green'});
    });

    it("will make negative numbers red", () => {
        const render = renderer.create(<BudgetSummary budget='name' remaining={-1} total={1}/>);
        const root = render.root;
        const remaining = root.findAllByType(Text)[1];
        
        expect(remaining.props.style).toContainEqual({color: 'red'});
    });

});