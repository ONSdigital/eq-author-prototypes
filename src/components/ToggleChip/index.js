import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import checkedIcon from "./checked.svg";
import Truncated from "components/Truncated";

const labelStyles = {
  checked: css`
    color: ${colors.white};
    background: #008dd0;
    border-color: #008dd0;

    &:hover {
      background: #007ab3;
    }
  `,
  unchecked: css`
    color: ${colors.text};
    background: #f8f8f8;
    border-color: rgba(0, 141, 208, 0);

    &:hover {
      background: #eeeded;
    }
  `
};

const focusStyles = {
  checked: css`
    color: ${colors.white};
    background: #008dd0;
    border-color: #005e8b;
  `,
  unchecked: css`
    color: ${colors.text};
    background: #eeeded;
    border-color: #008dd0;
  `
};

const checkboxStyle = {
  checked: css`
    border-color: white;
    background: white url(${checkedIcon}) no-repeat center;
    background-size: contain;
  `,
  unchecked: css`
    background-color: rgba(255, 255, 255, 0);
    border-color: #979797;
  `
};

const Field = styled.div`
  display: inline-block;
  position: relative;
  margin: 0.25em 0.5em 0.25em 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  border-radius: 2.75em;
  font-size: 0.8em;
  padding: 0.5em 0.8em 0.5em 2.5em;
  cursor: pointer;
  border: 2px solid;
  ${props => (props.checked ? labelStyles.checked : labelStyles.unchecked)};
`;

const Text = styled(Truncated)`
  display: inline-block;
  max-width: ${props => props.maxWidth}em;
`;

Text.defaultProps = {
  maxWidth: 30
};

export const Input = styled.input`
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 0.8em;
  top: 0;
  bottom: 0;
  margin: auto;
  -webkit-appearance: none;
  pointer-events: none;
  z-index: 2;
  border-radius: 50%;
  border: 2px solid;
  ${props => (props.checked ? checkboxStyle.checked : checkboxStyle.unchecked)};

  &:focus {
    opacity: 1;
    outline: none;
  }

  &:focus + ${Label} {
    ${props => (props.checked ? focusStyles.checked : focusStyles.unchecked)};
  }
`;

class ToggleChip extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool.isRequired,
    maxWidth: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  handleToggle = () => {
    this.props.onChange({
      name: this.props.id,
      value: !this.props.checked
    });
  };

  render() {
    const { id, title, children, checked, maxWidth } = this.props;
    return (
      <Field>
        <Input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={this.handleToggle}
        />
        <Label htmlFor={id} checked={checked}>
          <Text title={title} maxWidth={maxWidth}>
            {children}
          </Text>
        </Label>
      </Field>
    );
  }
}

export default ToggleChip;
