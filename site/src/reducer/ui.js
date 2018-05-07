import types from '../actions/types'

export default (state = {
  selectedTab: 0,
  showAutocomplete: false,
}, action) => {
  if (action.type === types.UI_CHANGE_TAB) {
    return {
      ...state,
      selectedTab: action.payload
    };
  }
  if (action.type === types.UI_TOGGLE_AUTOCOMPLETE) {
    console.log('reducer');
    return {
      ...state,
      showAutocomplete: action.payload.visibility,
    };
  }
  return state
}
