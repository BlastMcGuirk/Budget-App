import renderer from 'react-test-renderer';
import BudgetPage from "../BudgetPage";

describe("Budget Page Tests", () => {

    it("Renders correctly", () => {
        const tree = renderer.
            create(<BudgetPage />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});