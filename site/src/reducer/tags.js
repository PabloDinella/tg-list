import { types } from '../actions';

export default (state = {}, action) => {
  if (action.type === types.FIRESTORE_FETCH_CHATS_BY_TAGS_SUCCEEDED) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === types.FIRESTORE_FETCH_CHATS_BY_TAGS) {
    return {
      ...state,
      [action.payload.startAt]: 'loading',
    };
  }
  return state;
};
