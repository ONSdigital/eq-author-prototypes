import React from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import withRouting from "../enhancers/withRouting";
import EditorLayout from "components/EditorLayout";
import Loading from "components/Loading";

import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import withCreateRoutingRuleSet from "containers/enhancers/withCreateRoutingRuleSet";
import withCreateRoutingCondition from "containers/enhancers/withCreateRoutingCondition";
import withDeleteRoutingCondition from "containers/enhancers/withDeleteRoutingCondition";
import withCreateRoutingRule from "../enhancers/withCreateRoutingRule";
import withDeleteRoutingRule from "../enhancers/withDeleteRoutingRule";
import withDeleteRoutingRuleSet from "../enhancers/withDeleteRoutingRuleSet";
import withToggleConditionOption from "../enhancers/withToggleConditionOption";
import withUpdateRoutingCondition from "../enhancers/withUpdateRoutingCondition";
import withUpdateRoutingRule from "../enhancers/withUpdateRoutingRule";
import withUpdateRoutingRuleSet from "../enhancers/withUpdateRoutingRuleSet";

import UnconnectedRoutingEditor from "./UnconnectedRoutingEditor";

class RoutingPageRoute extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    page: CustomPropTypes.page,
    match: CustomPropTypes.match,
    loading: PropTypes.bool.isRequired
  };

  renderContent() {
    const { questionnaire, page, match, loading } = this.props;

    if (loading) {
      return <Loading height="20em">Loading routing</Loading>;
    }

    return (
      <UnconnectedRoutingEditor
        questionnaire={questionnaire}
        page={page}
        {...this.props}
        match={match}
      />
    );
  }

  render() {
    return <EditorLayout>{this.renderContent()}</EditorLayout>;
  }
}

export default flowRight(
  connect(null, { raiseToast }),
  withRouting,
  withCreateRoutingRuleSet,
  withCreateRoutingCondition,
  withDeleteRoutingCondition,
  withCreateRoutingRule,
  withDeleteRoutingRule,
  withToggleConditionOption,
  withUpdateRoutingCondition,
  withUpdateRoutingRule,
  withUpdateRoutingRuleSet,
  withDeleteRoutingRuleSet
)(RoutingPageRoute);
