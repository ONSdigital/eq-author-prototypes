import { graphql } from "react-apollo";
import fragment from "graphql/sectionFragment.graphql";
import createQuestionPageMutation from "graphql/createQuestionPage.graphql";
import { getLink } from "utils/UrlUtils";
import { get } from "lodash/fp";

export const redirectToNewPage = ({ history, questionnaireId }) => page => {
  const { id, section } = page;
  history.push(getLink(questionnaireId, section.id, id));
};

export const createUpdater = sectionId => (proxy, result) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  section.pages.push(result.data.createQuestionPage);

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onAddPage(sectionId, position) {
    const page = {
      title: "",
      description: "",
      sectionId,
      position
    };

    const update = createUpdater(sectionId);

    return mutate({
      variables: { input: page },
      update
    })
      .then(get("data.createQuestionPage"))
      .then(page => {
        redirectToNewPage(ownProps)(page);
        return page;
      });
  }
});

export default graphql(createQuestionPageMutation, {
  props: mapMutateToProps
});
