import { NativeStackScreenProps } from '@react-navigation/native-stack';
import renderer from 'react-test-renderer';
import Home from "../Home";

describe("Home Page Tests", () => {

    it("Renders correctly", () => {
        const props: any = {};
        const tree = renderer.
            create(<Home {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});