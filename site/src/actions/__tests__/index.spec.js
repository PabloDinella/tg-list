import {
  types,
  changeTab,
  showAutocomplete,
  hideAutocomplete,
  updateSearchTerm,
  cleanSearchTerm,
  loadTags,
  loadAllTags,
} from '../index'

describe('actions', () => {
  it('changeTab should return action object', () => {
    expect(changeTab(1)).toEqual({
      type: types.UI_CHANGE_TAB,
      payload: 1,
    })
  })

  it('showAutocomplete should return action object', () => {
    expect(showAutocomplete()).toEqual({
      type: types.UI_TOGGLE_AUTOCOMPLETE,
      payload: {
        visibility: true,
      },
    })
  })

  it('hideAutocomplete should return action object', () => {
    expect(hideAutocomplete()).toEqual({
      type: types.UI_TOGGLE_AUTOCOMPLETE,
      payload: {
        visibility: false,
      },
    })
  })

  it('updateSearchTerm should return action object', () => {
    expect(updateSearchTerm('term')).toEqual({
      type: types.SEARCH_UPDATE_TERM,
      payload: {
        term: 'term',
      },
    })
  })

  it('cleanSearchTerm should return action object', () => {
    expect(cleanSearchTerm()).toEqual({
      type: types.SEARCH_CLEAN,
    })
  })

  it('loadTags should return action object', () => {
    expect(loadTags('A', 'B')).toEqual({
      type: types.FIRESTORE_FETCH_CHATS_BY_TAGS,
      payload: {
        startAt: 'A',
        endAt: 'B',
      },
    })
  })

  it('loadAllTags should return action object', () => {
    expect(loadAllTags()).toEqual({
      type: types.FIRESTORE_FETCH_TAGS,
    })
  })
})
