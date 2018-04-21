import types from './types'

export const changeTab = (value) => ({
  type: types.UI_CHANGE_TAB,
  payload: value,
})
