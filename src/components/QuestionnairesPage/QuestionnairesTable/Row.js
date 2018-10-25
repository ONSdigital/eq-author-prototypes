import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { partial } from "lodash";

import { colors } from "constants/theme";
import IconButtonDelete from "components/IconButtonDelete";
import DuplicateButton from "components/DuplicateButton";
import Truncated from "components/Truncated";
import scrollIntoView from "utils/scrollIntoView";

import QuestionnaireLink from "../QuestionnaireLink";
import FormattedDate from "../FormattedDate";

const TruncatedQuestionnaireLink = Truncated.withComponent(QuestionnaireLink);
TruncatedQuestionnaireLink.displayName = "TruncatedQuestionnaireLink";

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
  ${({ disabled }) => disabled && `background-color: ${colors.lightGrey};`};
`;

const TD = styled.td`
  line-height: 2;
  text-align: ${props => props.textAlign};
`;

TD.propTypes = {
  textAlign: PropTypes.oneOf(["left", "center", "right"])
};

TD.defaultProps = {
  textAlign: "left"
};

const Collapsible = styled.div`
  height: 3.75em;
  padding: 1em;
`;

const IconCollapsible = styled(Collapsible)`
  padding: 0;
  display: flex;
  align-items: center;
`;

const halfTimeout = props => props.timeout / 2;
const RowTransition = styled(CSSTransition).attrs({
  classNames: "row"
})`
  transition: opacity ${halfTimeout}ms ease-out,
    border-color ${props => props.timeout / 10}ms ease-in
      ${props => (props.timeout / 10) * 9}ms;

  &.row-exit {
    opacity: 0.01;
    border-color: white;
  }

  &.row-exit ${Collapsible} {
    height: 0;
    padding: 0;
    transition: height ${halfTimeout}ms ease-in ${halfTimeout}ms,
      padding ${halfTimeout}ms ease-in ${halfTimeout}ms;
  }
`;

RowTransition.defaultProps = {
  timeout: 200
};

class Row extends React.Component {
  isQuestionnaireADuplicate() {
    return this.props.questionnaire.id.startsWith("dupe");
  }

  componentDidMount() {
    if (this.isQuestionnaireADuplicate() && this.row) {
      scrollIntoView(this.row);
    }
  }

  handleRowRef = row => {
    this.row = row;
  };

  render() {
    const {
      questionnaire,
      onDeleteQuestionnaire,
      onDuplicateQuestionnaire,
      ...rest
    } = this.props;

    const disabled = this.isQuestionnaireADuplicate();

    return (
      <RowTransition {...rest} key={questionnaire.id} exit={!disabled}>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <TR innerRef={this.handleRowRef} disabled={disabled}>
          <TD>
            <Collapsible>
              <TruncatedQuestionnaireLink
                data-test="anchor-questionnaire-title"
                questionnaire={questionnaire}
                title={questionnaire.title}
                disabled={disabled}
              >
                {questionnaire.title}
              </TruncatedQuestionnaireLink>
            </Collapsible>
          </TD>
          <TD>
            <Collapsible>
              <FormattedDate date={questionnaire.createdAt} />
            </Collapsible>
          </TD>
          <TD>
            <Collapsible>
              <Truncated>{questionnaire.createdBy.name || "Unknown"}</Truncated>
            </Collapsible>
          </TD>
          <TD textAlign="center">
            <IconCollapsible>
              <DuplicateButton
                data-test="btn-duplicate-questionnaire"
                onClick={() => onDuplicateQuestionnaire(questionnaire)}
                disabled={disabled}
              />
              <IconButtonDelete
                hideText
                data-test="btn-delete-questionnaire"
                onClick={partial(onDeleteQuestionnaire, questionnaire.id)}
                disabled={disabled}
              />
            </IconCollapsible>
          </TD>
        </TR>
      </RowTransition>
    );
  }
}

export default Row;