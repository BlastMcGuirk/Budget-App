jest.mock('../../database/db-service');
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { generateCommonTestData } from '../../../test_utils/test_data';
import { renderWithProviders } from '../../../test_utils/test_utils';
import BudgetSummaries from '../BudgetSummaries';

describe("Budget Summaries Tests", () => {

    it("Renders correctly", async () => {
        renderWithProviders(<BudgetSummaries />, { preloadedState: generateCommonTestData()});

        expect(screen.getByText("NEEDS")).toBeInTheDocument();
        expect(screen.getByText("WANTS")).toBeInTheDocument();
    });

});