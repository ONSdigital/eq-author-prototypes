import React from "react";
import { shallow } from "enzyme";
import CanvasSection from "./CanvasSection";

let component, handleFocus;

const Child = () => <div />;

describe("CanvasSection", () => {
  beforeEach(() => {
    handleFocus = jest.fn();

    component = shallow(
      <CanvasSection id="foo" onFocus={handleFocus} focused>
        <Child />
      </CanvasSection>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should handle focus event", () => {
    component.simulate("focus");
    expect(handleFocus).toHaveBeenCalledWith("foo");
  });

  it("should pass on its focused prop", () => {
    expect(component.find(Child).prop("focused")).toBe(true);
  });
});
