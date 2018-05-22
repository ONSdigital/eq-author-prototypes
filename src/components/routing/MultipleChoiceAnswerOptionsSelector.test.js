import React from "react";
import { shallow } from "enzyme";

import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";
import sections from "./mockstate";
import ToggleChip from "components/ToggleChip";

let wrapper, mockHandlers;

describe("components/MultipleChoiceAnswerOptionsSelector", () => {
  beforeEach(() => {
    mockHandlers = {
      onOptionSelectionChange: jest.fn()
    };

    wrapper = shallow(
      <MultipleChoiceAnswerOptionsSelector
        options={sections[0].pages[0].options}
        {...mockHandlers}
      />
    );
  });

  it("should render consistently", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle change events on ToggleChip", () => {
    wrapper
      .find(ToggleChip)
      .first()
      .simulate("change");
    expect(mockHandlers.onOptionSelectionChange).toHaveBeenCalled();
  });
});
