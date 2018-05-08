import {combineReducers} from 'redux'
import ui from './ui'
import tags from './tags'
import allTags from './allTags'
import chats from './chats'
import search from './search'

const messages = (state, action) => ['oi']

const rootReducer = combineReducers({
  messages,
  ui,
  tags,
  allTags,
  chats,
  search,
})

export default rootReducer
