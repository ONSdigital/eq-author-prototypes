import React from "react";
import { MenuItem as RMLMenuItem } from "react-menu-list";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

export const highlightedClassName = "is-highlighted";
export const menuItemStyles = css`
  overflow: hidden;
  /* stylelint-disable value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.lines};
  -webkit-box-orient: vertical;
  /* stylelint-enable */
  cursor: pointer;
  user-select: none;
  position: relative;
  line-height: 1.3;
  font-size: 0.9em;
  padding: 0 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  &.${highlightedClassName} {
    background: ${colors.lighterGrey};
  }
`;

export const MenuItemInner = styled.div`
  margin: 0.5em 0;
  overflow: hidden;
`;

const StyledMenuItem = styled(RMLMenuItem)`
  ${menuItemStyles};
`;

const MenuItem = ({ children, onItemChosen, item, ...otherProps }) => {
  const handleItemChosen = e => onItemChosen(item);
  return (
    <StyledMenuItem
      {...otherProps}
      highlightedClassName={highlightedClassName}
      onItemChosen={handleItemChosen}
    >
      <MenuItemInner>{children}</MenuItemInner>
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired, // eslint-disable-line
  onItemChosen: PropTypes.func.isRequired
};

MenuItem.defaultProps = {
  lines: 1
};

export default MenuItem;
