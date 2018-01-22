import React from "react";

import WrappingInput from "components/WrappingInput";
import { StatelessOption, SeamlessLabel } from "./Option";
import DeleteButton from "components/DeleteButton";
import { CHECKBOX, RADIO } from "constants/answer-types";

import { shallow, mount } from "enzyme";

describe("Option", () => {
  let mockMutations;
  let mockEvent;
  let wrapper;

  const option = {
    id: "1",
    label: "",
    description: ""
  };

  const render = (method = shallow, otherProps) => {
    wrapper = method(
      <StatelessOption
        {...mockMutations}
        option={option}
        hasDeleteButton
        type={RADIO}
        {...otherProps}
      />
    );

    return wrapper;
  };

  beforeEach(() => {
    mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    mockMutations = {
      onChange: jest.fn(),
      onUpdate: jest.fn(),
      onFocus: jest.fn(),
      onDelete: jest.fn()
    };

    render();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a checkbox", () => {
    render(mount, { type: CHECKBOX });
    expect(wrapper).toMatchSnapshot();
  });

  it("shouldn't render delete button if not applicable", () => {
    wrapper.setProps({ hasDeleteButton: false });
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange on input", () => {
    wrapper
      .find(SeamlessLabel)
      .first()
      .simulate("change");
    wrapper
      .find(SeamlessLabel)
      .first()
      .simulate("change");

    expect(mockMutations.onChange).toHaveBeenCalledTimes(2);
  });

  it("should update label on blur", () => {
    wrapper
      .find(SeamlessLabel)
      .first()
      .simulate("blur", mockEvent);

    expect(mockMutations.onUpdate).toHaveBeenCalled();
  });

  it("should update description on blur", () => {
    wrapper
      .find(WrappingInput)
      .first()
      .simulate("blur", mockEvent);

    expect(mockMutations.onUpdate).toHaveBeenCalled();
  });

  it("should invoke onDelete callback when option deleted", () => {
    wrapper.find(DeleteButton).simulate("click", mockEvent);

    expect(mockMutations.onDelete).toHaveBeenCalledWith(option.id);
  });
});
