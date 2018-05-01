import { get } from "lodash";
import { START_REQUEST, END_REQUEST } from "redux/saving/actions";

const initialState = {
  pendingRequestCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_REQUEST: {
      return {
        ...state,
        pendingRequestCount: state.pendingRequestCount + 1
      };
    }
    case END_REQUEST: {
      return {
        ...state,
        pendingRequestCount: Math.max(0, state.pendingRequestCount - 1)
      };
    }
    default:
      return state;
  }
};

export const isSaving = state => get(state, "saving.pendingRequestCount") > 0;
