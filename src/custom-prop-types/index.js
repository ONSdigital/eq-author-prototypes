import PropTypes from "prop-types";
import * as answerTypes from "constants/answer-types";

export default {
  breadcrumb: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  questionnaire: PropTypes.shape({
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    navigation: PropTypes.bool
  }),
  section: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }),
  page: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    guidance: PropTypes.string
  }),
  answer: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(Object.values(answerTypes))
  }),
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    qCode: PropTypes.string,
    value: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionnaireId: PropTypes.string.isRequired,
      sectionId: PropTypes.string.isRequired,
      pageId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  questionnaireList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      status: PropTypes.string,
      comments: PropTypes.shape({
        unread: PropTypes.bool.isRequired,
        count: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  )
};
