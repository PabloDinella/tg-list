import { types } from '../../actions'
import allTags from '../allTags'

describe('reducers/allTags', () => {
  it('should return state from payload', () => {
    expect(allTags(null, {
      type: types.FIRESTORE_FETCH_TAGS_SUCCEEDED,
      payload: {
        tags: ['tag1', 'tag2'],
      },
    })).toEqual(['tag1', 'tag2'])
  })

  it('should return default state', () => {
    expect(allTags(undefined, {
      type: null,
    })).toEqual([])
  })
})
