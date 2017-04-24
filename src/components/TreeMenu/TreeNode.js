import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {TreeNodeChildren} from 'components/TreeMenu';

const TreeNode = styled.div`
  color: white;
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SectionLabel = css`
  font-weight: 700;
`;

const QuestionLabel = css`
  font-weight: 700;
  font-size: 0.9em;
`;

const AnswerLabel = css`
  font-size: 0.8em;
`;

const TreeNodeLabel = styled.div`
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 0.9em;
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.05);
  }
  ${props => props.sectionNode && SectionLabel}
  ${props => props.questionNode && QuestionLabel}
  ${props => props.answerNode && AnswerLabel}
`;

export default class extends Component {
  render() {
    const {label, children, ...otherProps} = this.props;

    return (
      <TreeNode {...otherProps}>
        <TreeNodeLabel {...otherProps}>{label}</TreeNodeLabel>
        {children && <TreeNodeChildren>{children}</TreeNodeChildren>}
      </TreeNode>
    );
  }
}
