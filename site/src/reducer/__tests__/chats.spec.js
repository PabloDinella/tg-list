import { types } from '../../actions'
import chats from '../chats'

describe('reducers/chats', () => {
  it('should return state from payload', () => {
    expect(chats(null, {
      type: types.FIRESTORE_FETCH_CHATS_SUCCEEDED,
      payload: {
        a: 1,
        b: 2,
      },
    })).toEqual({ a: 1, b: 2 })
  })

  it('should return default state', () => {
    expect(chats(undefined, {
      type: null,
    })).toEqual({})
  })
})
