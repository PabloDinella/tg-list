import types from '../actions/types'

export default (state = {}, action) => {
  if (action.type === types.FIRESTORE_FETCH_TAGS_SUCCEEDED) {
    return {
      ...state,
      ...action.payload.tags
    };
  }
  return state
}
