jest.mock('../../database/db-service');
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { generateCommonTestData } from '../../../test_utils/test_data';
import { renderWithProviders } from '../../../test_utils/test_utils';
import BudgetSummary from '../BudgetSummary';

describe("Budget Summary Tests", () => {

    it("Renders correctly", async () => {
        const budget = 'NEEDS';
        const remaining = 1234.56;
        const total = 1500;
        renderWithProviders(
            <BudgetSummary 
                budget={budget} 
                remaining={remaining} 
                total={total} />,
            { preloadedState: generateCommonTestData()});

        expect(screen.getByText("NEEDS")).toBeInTheDocument();
        expect(screen.getByText("$1234.56")).toBeInTheDocument();
    });

});