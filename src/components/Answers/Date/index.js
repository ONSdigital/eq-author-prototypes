import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import DummyDate from "components/Answers/Dummy/Date";
import styled from "styled-components";

import { Field } from "components/Forms";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";

const Wrapper = styled.div.attrs({
  role: "presentation"
})`
  cursor: default;
  user-select: none;
  margin-bottom: 1.5em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Date = ({ answer, onChange, onUpdate, id }) => (
  <Wrapper id={id}>
    <Field id="label">
      <SeamlessTextArea
        placeholder="Label"
        size="medium"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.label}
        data-autofocus
      />
    </Field>
    <DummyDate />
  </Wrapper>
);

Date.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  id: PropTypes.string
};

export default withEntityEditor("answer", answerFragment)(Date);
