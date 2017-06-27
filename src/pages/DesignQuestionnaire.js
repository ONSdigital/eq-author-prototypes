import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CustomPropTypes from "proptypes";

import { colors } from "constants/theme";
import Field from "components/Forms/Field";
import Input from "components/Forms/Input";
import { sharedStyles } from "components/Forms/css";
import TextArea from "react-textarea-autosize";
import { get, noop } from "lodash";

const PageCanvas = styled.div`
  width: 75%;
  max-width: 40em;
  margin: 2em auto;
  padding: 0;
  border-radius: 2px;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StyledPageSection = styled.div`
  padding: 2em 5em;
  margin-bottom: -2px;
  border-bottom: 2px dashed #c6c6c6;
  outline-offset: -3px;
  outline: ${props =>
    props.focussed ? `3px solid ${colors.lightBlue}` : "none"};

  &:last-child {
    border: none;
  }
`;

const InvisibleInput = styled(Input)`
  font-size: 2em;
  font-weight: bold;
  display:inline-block;
  width: auto;
  border: none;
  padding: 0rem;
  color: ${colors.darkGrey};
  &:focus {
    border: none;
  }
  &::placeholder {
    color: #a3a3a3;
  }
`;

const SectionNumber = styled.div`
  font-size: 1.125em;
  font-weight: bold;
  position: absolute;
  left: -1em;
`;

const PageTitleInput = styled(InvisibleInput)`
  font-size: 1.125em;
  font-weight: bold;
`;

const QuestionNumber = styled.div`
  font-size: 2em;
  font-weight: bold;
  position: absolute;
  left: -1.5em;
`;

const InvisibleTextArea = styled(TextArea)`
  ${sharedStyles}
  resize: none;
  font-size: 0.875em;
  border:none;
  padding: 0;
  color: ${colors.darkGrey};

  &:focus {
    border: none;
  }
  &::placeholder {
    color: #a3a3a3;
  }
`;

class PageSection extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    onFocus: noop,
    onBlur: noop
  };

  constructor(props) {
    super(props);

    this.state = {
      focussed: false
    };
  }

  handleFocus = e => {
    if (!this.state.focussed) {
      this.setState({ focussed: true });
      this.props.onFocus(e);
    }
  };

  handleBlur = e => {
    if (this.state.focussed) {
      this.setState({ focussed: false });
      this.props.onBlur(e);
    }
  };

  render() {
    return (
      <StyledPageSection
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        focussed={this.state.focussed}
      >
        {this.props.children}
      </StyledPageSection>
    );
  }
}

const DesignQuestionnairePage = ({
  selected,
  selectedSection: selectedGroup,
  onChange,
  clearQuestionnaire,
  deleteItem,
  questionnaireItems,
  groupNumber,
  questionNumber
}) => {
  const isQuestionSelected = get(selected, "type") === "questions";

  return (
    <PageCanvas>
      <form onChange={onChange}>
        <PageSection focussed>
          <Field id={`sections.${get(selectedGroup, "title")}.displayName`}>
            <SectionNumber>
              {groupNumber}.
            </SectionNumber>
            <PageTitleInput
              placeholder="Section title"
              autoFocus
              value={get(selectedGroup, "displayName", "")}
            />
          </Field>
          <Field id={`sections.${get(selectedGroup, "title")}.description`}>
            <InvisibleTextArea
              cols="30"
              rows="5"
              placeholder="Enter a description (optional)..."
              value={get(selectedGroup, "description", "")}
            />
          </Field>
        </PageSection>
        <PageSection>
          <Field id={`questions.${get(selected, "id")}.displayName`}>
            <QuestionNumber>
              {groupNumber}.{questionNumber}
            </QuestionNumber>
            <InvisibleInput
              placeholder="Question text"
              value={
                isQuestionSelected ? get(selected, "item.displayName") : ""
              }
            />
          </Field>
        </PageSection>
        <PageSection>
          <p style={{ color: "#757575" }}>add an answer</p>
        </PageSection>
      </form>
    </PageCanvas>
  );
};

const { section, question, answer } = CustomPropTypes;

DesignQuestionnairePage.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    item: PropTypes.oneOfType([section, question, answer])
  }),
  selectedSection: CustomPropTypes.section,
  onChange: PropTypes.func.isRequired,
  clearQuestionnaire: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  questionnaireItems: CustomPropTypes.questionnaire.items,
  groupNumber: PropTypes.number,
  questionNumber: PropTypes.number
};

DesignQuestionnairePage.defaultProps = {
  groupNumber: 1,
  questionNumber: 1
};

export default DesignQuestionnairePage;
