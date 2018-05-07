import types from './types'

export const changeTab = (value) => ({
  type: types.UI_CHANGE_TAB,
  payload: value,
})

export const changeAutocompleteVisibility = (visibility) => ({
  type: types.UI_TOGGLE_AUTOCOMPLETE,
  payload: {
    visibility,
  },
})

export const loadTags = (startAt, endAt) => ({
  type: types.FIRESTORE_FETCH_CHATS_BY_TAGS,
  payload: {startAt, endAt},
})

export const loadAllTags = () => ({
  type: types.FIRESTORE_FETCH_TAGS,
})
