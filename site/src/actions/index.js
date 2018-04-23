import types from './types'

export const changeTab = (value) => ({
  type: types.UI_CHANGE_TAB,
  payload: value,
})

export const loadTags = (startAt, endAt) => ({
  type: types.FIRESTORE_FETCH_TAGS,
  payload: {startAt, endAt},
})
