import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";
import { rgba } from "polished";

import { colors } from "constants/theme";
import IconText from "components/IconText";
import Truncated from "components/Truncated";

import { TransitionGroup } from "react-transition-group";
import Transition from "./BadgeTransition";

export const activeClassName = "active";

export const Link = styled(RouterNavLink)`
  --color-text: rgb(255, 255, 255);
  text-decoration: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.5em 0 0;
  color: var(--color-text);

  &:hover {
    background: ${rgba(0, 0, 0, 0.2)};
  }

  &:focus {
    outline: 3px solid ${colors.orange};
    outline-offset: -3px;
  }

  &:active {
    outline: none;
  }

  &.${activeClassName} {
    --color-text: ${colors.black};

    background: ${colors.orange};
    pointer-events: none;
    &::before {
      filter: invert(80%);
    }
  }
`;

const Badge = styled.span`
  border-radius: 0.7em;
  background-color: ${colors.red};
  color: white;
  padding: 0.2em 0.5em;
  font-weight: normal;
  z-index: 2;
  margin-left: auto;
  line-height: 1;
  font-size: 0.9em;
  pointer-events: none;
`;

const Title = styled(Truncated)`
  display: inline-block;
  vertical-align: middle;
  line-height: 1.3;
`;

const NavLink = ({ to, title, children, icon, errors, ...otherProps }) => (
  <Link to={to} title={title} activeClassName={activeClassName} {...otherProps}>
    <IconText icon={icon}>
      <Title>{children}</Title>
    </IconText>

    <TransitionGroup component={React.Fragment}>
      {errors > 0 && (
        <Transition key={errors}>
          <Badge>{errors}</Badge>
        </Transition>
      )}
    </TransitionGroup>
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.func.isRequired,
  errors: PropTypes.number.isRequired
};

NavLink.defaultProps = {
  errors: 0
};

export default NavLink;
