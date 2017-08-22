import React, { Component } from "react";
import CustomPropTypes from "custom-prop-types";
import TextAnswer from "components/Answers/TextAnswer";
import CheckboxAnswer from "components/Answers/CheckboxAnswer";

class Answer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer
  };

  render() {
    const { answer } = this.props;
    switch (answer.type) {
      case "TextField":
        return <TextAnswer {...this.props} />;
      case "Checkbox":
        return <CheckboxAnswer {...this.props} />;

      default:
        return null;
    }
  }
}

export default Answer;
