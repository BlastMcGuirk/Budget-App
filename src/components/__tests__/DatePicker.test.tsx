jest.mock('../../database/db-service');
jest.mock(
    'react-native-vector-icons/MaterialIcons',
    () => 'Icon',
  );
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { generateCommonTestData } from '../../../test_utils/test_data';
import { renderWithProviders } from '../../../test_utils/test_utils';
import { DatePicker } from '../DatePicker';

describe("Date Picker Tests", () => {

    it("Renders correctly", async () => {
        renderWithProviders(<DatePicker />, { preloadedState: generateCommonTestData()});
        expect(screen.getByText("April 2023")).toBeInTheDocument();
    });

});