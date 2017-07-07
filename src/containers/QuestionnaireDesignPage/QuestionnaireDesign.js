import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";

import QuestionnaireDesign from "components/QuestionnaireDesign";
import CustomPropTypes from "custom-prop-types";
import { set, noop } from "lodash";

export class QuestionnaireDesignPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    questionnaire: CustomPropTypes.questionnaire
  };

  constructor(props) {
    super(props);

    this.state = {
      section: {
        title: "foo",
        description: "bar"
      },
      page: {
        title: "my questions",
        description: "lorem ipsum",
        guidance: "foo bar blah meh",
        type: "General"
      },
      focused: "section"
    };
  }

  handleChange = change => {
    this.setState(set(this.state, change.name, change.value));
  };

  handleAnswerAdd = () => {
    alert("add an answer to this parent");
  };

  handleFocusChange = sectionId => {
    if (sectionId !== this.state.focused) {
      this.setState({ focused: sectionId });
    }
  };

  render() {
    const { loading, questionnaire } = this.props;
    const { section, page, focused } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <BaseLayout
        breadcrumb={{ path: window.location.href, title: questionnaire.title }}
      >
        <Grid align="top">
          <Column cols={3} gutters={false}>
            Sidebar
          </Column>
          <Column gutters={false}>
            <QuestionnaireDesign
              section={section}
              page={page}
              focused={focused}
              onAnswerAdd={this.handleAnswerAdd}
              onChange={this.handleChange}
              onFocus={this.handleFocusChange}
              onBlur={this.handleFocusChange}
            />
          </Column>
          <Column cols={2} gutters={false}>
            <PropertyPane>
              <PropertyPaneTitle>Question properties</PropertyPaneTitle>
              <QuestionProperties question={page} onSubmit={noop} />
            </PropertyPane>
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;
