import renderer from 'react-test-renderer';
import BudgetSummary from "../BudgetSummary";

describe("Budget Summaries Tests", () => {

    it("Renders correctly", () => {
        const tree = renderer
            .create(<BudgetSummary budget='name' remaining={1} total={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});