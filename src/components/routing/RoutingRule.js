import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Button from "components/Button";
import IconText from "components/IconText";

import { colors, radius } from "constants/theme";

import IconRoute from "./icon-route.svg?inline";

import RoutingRuleResultSelector from "./RoutingRuleResultSelector";
import getIdForObject from "utils/getIdForObject";

const RoutingStatement = styled.div`
  padding: 0;
`;

const Box = styled.div`
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
  margin-bottom: 2em;
  position: relative;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
`;

const Title = styled.h2`
  position: absolute;
  margin: 0;
  top: 1.5em;
  left: 1.7em;
  letter-spacing: 0.05em;
  font-size: 0.9em;
  font-weight: bold;
`;

const RoutingRule = ({
  children,
  page,
  onDeleteRule,
  onThenChange,
  onAddRule,
  title,
  routingOptions,
  gotoValue,
  canRoute,
  rule,
  className
}) => {
  const { conditions } = rule;

  return (
    <div className={className}>
      <Box>
        {title && <Title>{title}</Title>}
        <Buttons>
          <Button
            onClick={onDeleteRule}
            data-test="btn-delete"
            disabled={!children}
            variant="tertiary"
            small
          >
            <IconText icon={IconRoute}>Remove rule</IconText>
          </Button>
        </Buttons>

        <RoutingStatement>{children}</RoutingStatement>

        <RoutingRuleResultSelector
          id="then"
          label="THEN"
          routingOptions={routingOptions}
          onChange={function({ value }) {
            onThenChange(value, rule);
          }}
          value={getIdForObject(rule.goto)}
          data-test="select-then"
          disabled={!canRoute}
        />
      </Box>
    </div>
  );
};

RoutingRule.propTypes = {
  rule: PropTypes.object.isRequired,
  children: PropTypes.node,
  page: CustomPropTypes.page.isRequired,
  onAddRule: PropTypes.func.isRequired,
  onDeleteRule: PropTypes.func.isRequired,
  onThenChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  routingOptions: PropTypes.arrayOf(CustomPropTypes.section),
  canRoute: PropTypes.bool.isRequired,
  gotoValue: PropTypes.string
};

RoutingRule.defaultProps = {
  canRoute: true
};

export default RoutingRule;
