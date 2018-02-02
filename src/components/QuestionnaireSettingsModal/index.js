import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import DialogHeader from "components/Dialog/DialogHeader";
import DialogMessage from "components/Dialog/DialogMessage";
import PropTypes from "prop-types";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import CustomPropTypes from "custom-prop-types";
import pipeP from "p-pipe";

const noop = () => {};

const defaultQuestionnaire = {
  title: "",
  description: "",
  surveyId: "",
  theme: "default",
  legalBasis: "StatisticsOfTradeAct",
  navigation: false
};

const CenteredDialogMessage = styled(DialogMessage)`
  text-align: center;
`;

const StyledModal = styled(Modal)`
  width: 30em;
`;

const QuestionnaireSettingsModal = ({
  questionnaire,
  isOpen,
  onClose,
  onSubmit,
  confirmText
}) => (
  <StyledModal isOpen={isOpen} onClose={onClose}>
    <DialogHeader>
      <CenteredDialogMessage heading="Questionnaire settings" />
    </DialogHeader>
    <QuestionnaireMeta
      questionnaire={questionnaire}
      onCancel={onClose}
      onSubmit={pipeP(onSubmit, onClose)}
      onUpdate={noop}
      confirmText={confirmText}
    />
  </StyledModal>
);

QuestionnaireSettingsModal.propTypes = {
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  confirmText: PropTypes.string.isRequired,
  questionnaire: CustomPropTypes.questionnaire
};

QuestionnaireSettingsModal.defaultProps = {
  questionnaire: defaultQuestionnaire
};

export default QuestionnaireSettingsModal;
