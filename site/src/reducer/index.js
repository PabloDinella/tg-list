import { combineReducers } from 'redux'
import ui from './ui'
import tags from './tags'
import allTags from './allTags'
import chats from './chats'
import search from './search'

const rootReducer = combineReducers({
  ui,
  tags,
  allTags,
  chats,
  search,
})

export default rootReducer
