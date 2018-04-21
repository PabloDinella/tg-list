import types from '../actions/types'

export default (state = {
  selectedTab: 0,
}, action) => {
  if (action.type === types.UI_CHANGE_TAB) {
    return {
      ...state,
      selectedTab: action.payload
    };
  }
  return state
}
