import React from "react";
import PropTypes from "prop-types";
import { AppContainer } from "react-hot-loader";

import { Switch } from "react-router-dom";
import { Route, Router } from "react-router";
import { ApolloProvider } from "react-apollo";

import QuestionnairesPage from "containers/QuestionnairesPage";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage";
import QuestionnaireDesignPage from "containers/QuestionnaireDesignPage";
import NotFoundPage from "containers/NotFoundPage";

const App = ({ store, client, history }) => (
  <AppContainer>
    <ApolloProvider client={client} store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={QuestionnairesPage} exact />
          <Route
            path="/questionnaire/create"
            component={QuestionnaireCreatePage}
          />
          <Route
            path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
            exact={false}
            component={QuestionnaireDesignPage}
          />
          <Route path="*" component={NotFoundPage} exact />
        </Switch>
      </Router>
    </ApolloProvider>
  </AppContainer>
);

App.propTypes = {
  client: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default App;
