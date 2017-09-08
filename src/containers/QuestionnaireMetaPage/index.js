import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { pick, mapValues } from "lodash";

import getQuestionnaire from "graphql/getQuestionnaire.graphql";
import updateQuestionnaire from "graphql/updateQuestionnaire.graphql";
import QuestionnaireMeta from "./QuestionnaireMetaPage";

export const mapStateToProps = (state, ownProps) =>
  mapValues(pick(ownProps.match.params, ["questionnaireId"]), val =>
    parseInt(val, 10)
  );

export const mapResultsToProps = ({ data }) =>
  pick(data, ["questionnaire", "loading"]);

export const withData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

export const withMutation = graphql(updateQuestionnaire, {
  props: ({ mutate }) => ({
    onUpdate(questionnaire) {
      return mutate({ variables: questionnaire });
    }
  })
});

export default compose(connect(mapStateToProps), withData, withMutation)(
  QuestionnaireMeta
);
