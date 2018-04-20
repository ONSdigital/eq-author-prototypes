import { shallow } from "enzyme";
import SectionNavItem, { AddPageBtn } from "./SectionNavItem";
import React from "react";

describe("SectionNavItem", () => {
  let wrapper, handleAddPage;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn(() => Promise.resolve);

    wrapper = shallow(
      <SectionNavItem
        questionnaire={questionnaire}
        section={section}
        onAddPage={handleAddPage}
        duration={123}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle 'add page' button clicks", () => {
    wrapper.find(AddPageBtn).simulate("click");
    expect(handleAddPage).toHaveBeenCalledWith(
      section.id,
      section.pages.length
    );
  });
});
