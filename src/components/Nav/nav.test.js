import React from "react";
import { mount, shallow } from "enzyme";
import Nav, { StyledNav } from "components/Nav";

describe("components/Nav", function() {
  it("should render Nav", function() {
    const wrapper = shallow(<Nav />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain links", function() {
    const wrapper = mount(<StyledNav />);
    expect(wrapper.find("a")).toBeTruthy();
  });
});