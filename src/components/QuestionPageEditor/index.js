import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import AnswerTypeSelector from "components/AnswerTypeSelector";
import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";
import CanvasSection, {
  BasicSection
} from "components/EditorSurface/CanvasSection";
import SlideTransition from "components/SlideTransition";
import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { flowRight } from "lodash";
import CustomPropTypes from "custom-prop-types";
import getIdForObject from "utils/getIdForObject";
import focusOnEntity from "utils/focusOnEntity";
import iconPage from "./icon-dialog-page.svg";

import withDeleteAnswer from "containers/enhancers/withDeleteAnswer";
import withCreateAnswer from "containers/enhancers/withCreateAnswer";
import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import withCreateOption from "containers/enhancers/withCreateOption";
import withUpdateOption from "containers/enhancers/withUpdateOption";
import withDeleteOption from "containers/enhancers/withDeleteOption";

import * as ToastActionCreators from "redux/toast/actions";
import EntityToolbar from "components/EntityToolbar";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import getTextFromHTML from "utils/getTextFromHTML";

const AddAnswerSection = BasicSection.extend`
  text-align: center;
  padding: 1em;
`;
const QuestionCanvasSection = styled(CanvasSection)`
  padding: 0;
`;
const AnswerSection = styled(CanvasSection)`
  padding-top: 3em;
`;

const Padding = styled.div`
  padding: 0 2em 2em;
`;

export class QPE extends React.Component {
  static propTypes = {
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    page: CustomPropTypes.page,
    section: CustomPropTypes.section
  };

  state = {
    showDeleteConfirmDialog: false
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: false });

  handleDeletePageConfirm = () => {
    const { onDeletePage, section, page } = this.props;
    onDeletePage(section.id, page.id);
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  handleAddAnswer = answerType => {
    return this.props.onAddAnswer(answerType).then(focusOnEntity);
  };

  renderAnswerEditor = answer => {
    const {
      onUpdateAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption
    } = this.props;

    return (
      <SlideTransition key={getIdForObject(answer)}>
        <AnswerSection id={getIdForObject(answer)} key={getIdForObject(answer)}>
          <AnswerEditor
            answer={answer}
            onUpdate={onUpdateAnswer}
            onAddOption={onAddOption}
            onUpdateOption={onUpdateOption}
            onDeleteOption={onDeleteOption}
            onDeleteAnswer={this.handleDeleteAnswer}
            data-test="answer-editor"
          />
        </AnswerSection>
      </SlideTransition>
    );
  };

  render() {
    const { page, onUpdatePage } = this.props;

    return (
      <div>
        <QuestionCanvasSection id={getIdForObject(page)}>
          <EntityToolbar
            onDelete={this.handleOpenDeleteConfirmDialog}
            entity={page}
          />
          <DeleteConfirmDialog
            isOpen={this.state.showDeleteConfirmDialog}
            onClose={this.handleCloseDeleteConfirmDialog}
            onDelete={this.handleDeletePageConfirm}
            title={getTextFromHTML(page.title) || "Untitled Page"}
            alertText="All edits, properties and routing settings will also be removed."
            icon={iconPage}
            data-test="delete-page"
          />
          <Padding>
            <MetaEditor onUpdate={onUpdatePage} page={page} />
          </Padding>
        </QuestionCanvasSection>
        <TransitionGroup>
          {page.answers.map(this.renderAnswerEditor)}
        </TransitionGroup>
        <AddAnswerSection>
          <AnswerTypeSelector
            onSelect={this.handleAddAnswer}
            answers={page.answers}
            data-test="add-answer"
          />
        </AddAnswerSection>
      </div>
    );
  }
}

export default flowRight(
  connect(null, ToastActionCreators),
  withCreateAnswer,
  withUpdateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption
)(QPE);
