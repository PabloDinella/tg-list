import { types } from '../../actions'
import ui from '../ui'

describe('reducers/ui', () => {
  it('should return state from payload', () => {
    expect(ui(undefined, {
      type: types.UI_CHANGE_TAB,
      payload: 1,
    })).toEqual({
      selectedTab: 1,
      showAutocomplete: false,
    })
  })

  it('should return changed showAutocomplete state', () => {
    expect(ui(undefined, {
      type: types.UI_TOGGLE_AUTOCOMPLETE,
      payload: {
        visibility: true,
      },
    })).toEqual({
      selectedTab: 0,
      showAutocomplete: true,
    })
  })

  it('should return default state', () => {
    expect(ui(undefined, {
      type: null,
    })).toEqual({
      selectedTab: 0,
      showAutocomplete: false,
    })
  })
})
