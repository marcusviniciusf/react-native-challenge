import Block from "./Block";
import {create} from "react-test-renderer";

describe("Block item", () => {
  it("should match snapshot", () => {
    const el = create(<Block titleId={1} text="lorem ipsum" />).toJSON();
    expect(el).toMatchSnapshot();
  });
});
