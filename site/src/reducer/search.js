import { types } from '../actions';

export default (state = {
  term: null,
}, action) => {
  if (action.type === types.SEARCH_UPDATE_TERM) {
    return {
      ...state,
      term: action.payload.term,
    };
  }
  if (action.type === types.SEARCH_CLEAN) {
    return {
      ...state,
      term: null,
    };
  }
  return state;
};
