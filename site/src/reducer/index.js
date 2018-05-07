import {combineReducers} from 'redux'
import ui from './ui'
import tags from './tags'
import allTags from './allTags'
import chats from './chats'

const messages = (state, action) => ['oi']

const rootReducer = combineReducers({
  messages,
  ui,
  tags,
  allTags,
  chats,
})

export default rootReducer
