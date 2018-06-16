import { types } from '../../actions'
import tags from '../tags'

describe('reducers/tags', () => {
  it('should return state from payload', () => {
    expect(tags(null, {
      type: types.FIRESTORE_FETCH_CHATS_BY_TAGS_SUCCEEDED,
      payload: {
        term: 'term1',
      },
    })).toEqual({ term: 'term1' })
  })

  it('should return loading state', () => {
    expect(tags(undefined, {
      type: types.FIRESTORE_FETCH_CHATS_BY_TAGS,
      payload: {
        startAt: 'A',
      },
    })).toEqual({ A: 'loading' })
  })

  it('should return default state', () => {
    expect(tags(undefined, {
      type: null,
    })).toEqual({})
  })
})
