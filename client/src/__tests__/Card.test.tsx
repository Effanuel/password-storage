import React from "react";
import { shallow } from "enzyme";
import { SpinnerComponent } from "../components";

describe("SpinnerComponent", () => {
  it("renders component", () => {
    const link = shallow(<SpinnerComponent />);
    expect(link).toMatchSnapshot();
  });
});
