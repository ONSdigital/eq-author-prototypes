import getRoutingQuery from "graphql/getRouting.graphql";
import { graphql } from "react-apollo";
import findById from "utils/findById";
import { get } from "lodash";

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading, availableRoutingDestinations } = data;
  const { sectionId, pageId } = ownProps.match.params;

  if (loading) {
    return { loading };
  }

  if (!sectionId) {
    return {
      loading,
      questionnaire
    };
  }

  const section = findById(questionnaire.sections, sectionId);
  const page = findById(get(section, "pages"), pageId);

  return {
    loading,
    questionnaire,
    section,
    page,
    availableRoutingDestinations
  };
};

export const mapPropsToOptions = ({ match: { params } }) => ({
  variables: params
});

export default graphql(getRoutingQuery, {
  props: mapResultsToProps,
  options: mapPropsToOptions
});
