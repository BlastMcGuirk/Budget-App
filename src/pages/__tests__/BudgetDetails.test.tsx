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
                            name: 'Rent',
                            amount: 1757.25,
                            date: '8/4/2023',
                            category: 'Bills'
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