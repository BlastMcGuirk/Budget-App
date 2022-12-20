import renderer from 'react-test-renderer';
import BudgetSummaries from '../BudgetSummaries';

describe("Budget Summaries Tests", () => {

    it("Renders correctly", () => {
        const tree = renderer
            .create(<BudgetSummaries />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});