import renderer from 'react-test-renderer';
import Home from "../Home";
import * as SQLite from 'expo-sqlite';
jest.mock('expo-sqlite');

describe("Home Page Tests", () => {

    beforeEach(() => {
        (SQLite.openDatabase as jest.Mock).mockReturnValueOnce({});
    })

    it("Renders correctly", () => {
        const props: any = {};
        const tree = renderer.
            create(<Home {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});