import {
  types,
  changeTab,
} from '../index'

describe('actions', () => {
  it('changeTab should return action object', () => {
    expect(changeTab(1)).toEqual({
      type: types.UI_CHANGE_TAB,
      payload: 1,
    })
  })

  it('changeAutocompleteVisibility should return action object', () => {
    expect(changeTab()).toEqual({
      type: types.UI_CHANGE_TAB,
      payload: 1,
    })
  })
})
