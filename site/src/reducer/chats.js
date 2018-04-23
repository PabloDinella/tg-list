import types from '../actions/types'

export default (state = {}, action) => {
  if (action.type === types.FIRESTORE_FETCH_CHATS_SUCCEEDED) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state
}
