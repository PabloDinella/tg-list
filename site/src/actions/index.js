export const types = {
  FIRESTORE_FETCH_TAGS: 'FIRESTORE_FETCH_TAGS',
  FIRESTORE_FETCH_TAGS_SUCCEEDED: 'FIRESTORE_FETCH_TAGS_SUCCEEDED',
  FIRESTORE_FETCH_CHATS_BY_TAGS: 'FIRESTORE_FETCH_CHATS_BY_TAGS',
  FIRESTORE_FETCH_CHATS_BY_TAGS_SUCCEEDED: 'FIRESTORE_FETCH_CHATS_BY_TAGS_SUCCEEDED',
  FIRESTORE_FETCH_CHATS_SUCCEEDED: 'FIRESTORE_FETCH_CHATS_SUCCEEDED',

  UI_CHANGE_TAB: 'UI_CHANGE_TAB',
  UI_TOGGLE_AUTOCOMPLETE: 'UI_TOGGLE_AUTOCOMPLETE',

  SEARCH_UPDATE_TERM: 'SEARCH_UPDATE_TERM',
  SEARCH_CLEAN: 'SEARCH_CLEAN',
}

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

export const updateSearchTerm = (term) => ({
  type: types.SEARCH_UPDATE_TERM,
  payload: {
    term,
  },
})

export const cleanSearchTerm = () => ({
  type: types.SEARCH_CLEAN,
})

export const loadTags = (startAt, endAt) => ({
  type: types.FIRESTORE_FETCH_CHATS_BY_TAGS,
  payload: {startAt, endAt},
})

export const loadAllTags = () => ({
  type: types.FIRESTORE_FETCH_TAGS,
})
