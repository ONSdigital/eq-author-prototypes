import {LOAD_SURVEY, CHANGE} from 'actions/survey';
import {merge} from 'lodash';

const defaultState = {
  data_version: '0.0.1',
  description: '',
  groups: {},
  legal_basis: 'StatisticsOfTradeAct',
  mime_type: 'application/json/ons/eq',
  questionnaire_id: '0001',
  schema_version: '0.0.1',
  id: '000',
  theme: 'default',
  title: '',
  blocks: {
    introduction: {
      type: 'Introduction',
      id: 'introduction',
      information_to_provide: [],
    },
  },
  sections: {},
  questions: {},
  answers: {},
};

export default function survey(state = defaultState, action) {
  switch (action.type) {
    case LOAD_SURVEY:
      return {
        ...state,
        ...action.payload,
      };

    case CHANGE:
      const {type, id, value, field} = action.payload;
      return {
        state,
        ...merge(state, {
          [type]: {
            [id]: {
              [field]: value,
            },
          },
        }),
      };
    default:
      return state;
  }
}
