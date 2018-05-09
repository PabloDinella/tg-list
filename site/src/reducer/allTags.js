import { types } from '../actions'

export default (state = [], action) => {
  if (action.type === types.FIRESTORE_FETCH_TAGS_SUCCEEDED) {
    return action.payload.tags
  }
  return state
}
