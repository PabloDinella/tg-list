import { types } from '../../actions'
import search from '../search'

describe('reducers/search', () => {
  it('should return state from payload', () => {
    expect(search(null, {
      type: types.SEARCH_UPDATE_TERM,
      payload: {
        term: 'term1',
      },
    })).toEqual({ term: 'term1' })
  })

  it('should return cleaned state', () => {
    expect(search(undefined, {
      type: types.SEARCH_CLEAN,
    })).toEqual({ term: null })
  })

  it('should return default state', () => {
    expect(search(undefined, {
      type: null,
    })).toEqual({ term: null })
  })
})
