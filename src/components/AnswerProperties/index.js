import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Field, Label } from "components/Forms";
import styled from "styled-components";
import ToggleSwitch from "components/ToggleSwitch";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 0;
`;

class AnswerProperties extends React.Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onSubmit: PropTypes.func,
    onUpdateAnswer: PropTypes.func.isRequired
  };

  handleChange = ({ value: mandatory }) => {
    const { id } = this.props.answer;
    this.props.onUpdateAnswer({
      id,
      mandatory
    });
  };

  render() {
    const { answer } = this.props;
    return (
      <InlineField id="mandatory">
        <Label small inline>
          Answer required
        </Label>
        <ToggleSwitch
          name="mandatory"
          onChange={this.handleChange}
          checked={answer.mandatory}
        />
      </InlineField>
    );
  }
}

export default AnswerProperties;
