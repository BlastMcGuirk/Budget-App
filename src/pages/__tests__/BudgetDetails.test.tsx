import renderer from 'react-test-renderer';
import BudgetDetails, { BudgetDetailsProps } from '../BudgetDetails';

describe("Budget Details Page Tests", () => {

    it("Renders correctly", () => {
        const props: any = {
            route: {
                params: {
                    budget: 'needs',
                    items: [
                        {
                            id: 1,
                            budgetId: 1,
                            name: "Item",
                            amount: 12.34,
                            day: "1",
                            month: "1",
                            year: "2022",
                            category: "Category"
                        }
                    ]
                }
            },
        };
        const tree = renderer.
            create(<BudgetDetails {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});