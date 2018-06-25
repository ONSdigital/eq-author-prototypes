import React from "react";
import { mount, shallow } from "enzyme";
import QuestionPageRoute, { UnwrappedQuestionPageRoute } from "./";
import TestProvider from "tests/utils/TestProvider";
import { buildPagePath } from "utils/UrlUtils";
import flushPromises from "tests/utils/flushPromises";
import createRouterContext from "react-router-test-context";
import PropTypes from "prop-types";

import query from "./QuestionPage.graphql";
import movePageQuery from "graphql/getQuestionnaire.graphql";

const movePageMock = {
  request: {
    query: movePageQuery,
    variables: {
      id: "1"
    }
  },
  result: {
    data: {
      questionnaire: {
        id: "1",
        title: "",
        description: "",
        surveyId: "1",
        theme: "foo",
        legalBasis: "",
        navigation: true,
        summary: "",
        __typename: "Questionnaire",
        sections: [
          {
            __typename: "Section",
            id: "2",
            title: "foo",
            pages: [
              {
                __typename: "QuestionPage",
                id: "3",
                title: "bar",
                position: 0
              },
              {
                __typename: "QuestionPage",
                id: "4",
                title: "blah",
                position: 1
              }
            ]
          }
        ]
      }
    }
  }
};

describe("QuestionPageRoute", () => {
  let store, match, context, childContextTypes;

  beforeEach(() => {
    childContextTypes = { router: PropTypes.object };

    match = {
      params: { questionnaireId: "1", sectionId: "2", pageId: "3" }
    };

    store = {
      getState: jest.fn(() => ({
        toasts: {},
        saving: { online: true }
      })),
      subscribe: jest.fn(),
      dispatch: jest.fn()
    };

    context = createRouterContext({
      location: { pathname: buildPagePath(match.params) },
      match
    });
  });

  describe("data fetching", () => {
    const render = (mocks, Component = QuestionPageRoute, props = {}) =>
      mount(
        <TestProvider reduxProps={{ store }} apolloProps={{ mocks }}>
          <Component match={match} {...props} />
        </TestProvider>,
        { context, childContextTypes }
      );

    it("should show loading spinner while request in flight", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "3"
          }
        },
        result: {
          data: {
            questionPage: {
              __typename: "QuestionPage",
              id: "3",
              title: "foo",
              description: "bar",
              pageType: "QuestionPage",
              position: 0,
              guidance: "",

              answers: []
            }
          }
        }
      };

      const wrapper = render([mock, mock, movePageMock, movePageMock]);
      expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(true);
      expect(wrapper.find(`[data-test="question-page-editor"]`).exists()).toBe(
        false
      );
    });

    it("should render the editor once loaded", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "3"
          }
        },
        result: {
          data: {
            questionPage: {
              __typename: "QuestionPage",
              id: "3",
              title: "foo",
              description: "bar",
              pageType: "QuestionPage",
              position: 0,
              guidance: "",
              answers: []
            }
          }
        }
      };

      const wrapper = render([mock, mock, movePageMock, movePageMock]);

      return flushPromises().then(() => {
        wrapper.update();
        expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(false);
        expect(
          wrapper.find(`[data-test="question-page-editor"]`).exists()
        ).toBe(true);
      });
    });

    it("should render error if problem with request", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "3"
          }
        },
        error: new Error("oops")
      };

      const wrapper = shallow(
        <UnwrappedQuestionPageRoute
          data={mock}
          error={new Error("oops")}
          loading={false}
          match={match}
          onAddAnswer={jest.fn()}
          onDeletePage={jest.fn()}
          onMovePage={jest.fn()}
          onAddPage={jest.fn()}
        />
      );

      // for some reason, mounting didn't work for this test, so i had to shallow instead :(
      expect(wrapper.find("Error").exists()).toBe(true);
    });

    it("should render error if no page returned", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "3"
          }
        },
        result: {
          data: {
            questionPage: null
          }
        }
      };

      const wrapper = render([mock, mock, movePageMock, movePageMock]);

      return flushPromises().then(() => {
        wrapper.update();
        expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(false);
        expect(
          wrapper.find(`[data-test="question-page-editor"]`).exists()
        ).toBe(false);
        expect(wrapper.find(`[data-test="error"]`).exists()).toBe(true);
      });
    });
  });

  describe("behaviour", () => {
    let mockHandlers;

    beforeEach(() => {
      mockHandlers = {
        onMovePage: jest.fn(),
        onUpdatePage: jest.fn(),
        onDeletePage: jest.fn(),
        onAddPage: jest.fn(),
        onUpdateAnswer: jest.fn(),
        onAddAnswer: jest.fn(),
        onDeleteAnswer: jest.fn(),
        onAddOption: jest.fn(),
        onUpdateOption: jest.fn(),
        onDeleteOption: jest.fn(),
        onAddOther: jest.fn(),
        onDeleteOther: jest.fn()
      };
    });

    const render = (props = {}, renderer = mount) =>
      renderer(
        <TestProvider
          reduxProps={{ store }}
          apolloProps={{ mocks: [movePageMock] }}
        >
          <UnwrappedQuestionPageRoute {...props} />
        </TestProvider>,
        { context, childContextTypes }
      );

    it("ensures confirmation before delete", () => {
      const data = {
        questionPage: {
          __typename: "QuestionPage",
          id: "3",
          title: "foo",
          description: "bar",
          pageType: "QuestionPage",
          position: 0,
          guidance: "",
          answers: []
        }
      };

      const wrapper = render({
        loading: false,
        match,
        data,
        ...mockHandlers
      });

      wrapper
        .find(`[data-test="btn-delete"]`)
        .first()
        .simulate("click");

      wrapper
        .find(`[data-test="btn-delete-modal"]`)
        .first()
        .simulate("click");

      expect(mockHandlers.onDeletePage).toHaveBeenCalledWith("2", "3");
    });

    it("should allow answers to be added", () => {
      const data = {
        questionPage: {
          __typename: "QuestionPage",
          id: "3",
          title: "foo",
          description: "bar",
          pageType: "QuestionPage",
          position: 0,
          guidance: "",
          answers: []
        }
      };

      const onAddAnswer = jest.fn(() => Promise.resolve(() => ({ id: "1" })));

      const wrapper = render(
        {
          loading: false,
          match,
          data,
          ...mockHandlers,
          onAddAnswer
        },
        mount
      );

      wrapper
        .find(`[data-test="btn-add-answer"]`)
        .first()
        .simulate("click");

      wrapper
        .find(`button[title="Radio"]`)
        .first()
        .simulate("click");

      expect(onAddAnswer).toHaveBeenCalledWith("3", "Radio");
    });
  });
});