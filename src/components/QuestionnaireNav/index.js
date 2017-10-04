import React, { Component } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { colors } from "constants/theme";

import SectionNav from "components/QuestionnaireNav/SectionNav";

import plusIcon from "./icon-plus.svg";

const Container = styled.div`
  padding: 1em;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;
  line-height: 1.5;
  position: relative;
`;

const AddSection = styled.div`
  border-top: 1px solid #c3c3c3;
  padding: 1em 0;
  position: sticky;
  bottom: 0;
  left: 0;
  background: ${colors.lighterGrey};
`;

export const AddSectionBtn = styled.button`
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: ${colors.text};
  font-weight: 600;
  font-size: 0.75em;

  &::before {
    vertical-align: middle;
    display: inline-block;
    content: url(${plusIcon});
    margin-right: 0.6em;
  }
  &:hover {
    color: black;
  }
`;

class QuestionnaireNav extends Component {
  saveSectionNavRef = sectionNav => {
    this.sectionNav = sectionNav;
  };

  handleClick = () => {
    const { questionnaire, onAddSection } = this.props;
    onAddSection(questionnaire.id).then(section => {
      this.sectionNav.scrollSectionIntoView(section.id);
    });
  };

  render() {
    const { questionnaire, onAddPage, onDeletePage } = this.props;

    return (
      <Container id="questionnaire-nav">
        <Title>Questionnaire structure</Title>
        <SectionNav
          transitionDuration={200}
          questionnaire={questionnaire}
          onAddPage={onAddPage}
          onDeletePage={onDeletePage}
          ref={this.saveSectionNavRef}
        />
        <AddSection>
          <AddSectionBtn primary onClick={this.handleClick}>
            Create new section
          </AddSectionBtn>
        </AddSection>
      </Container>
    );
  }
}

QuestionnaireNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  onAddPage: PropTypes.func.isRequired,
  onDeletePage: PropTypes.func.isRequired,
  onAddSection: PropTypes.func.isRequired
};

export default QuestionnaireNav;
