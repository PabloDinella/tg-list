import {combineReducers} from 'redux'
import ui from './ui'
import tags from './tags'

const messages = (state, action) => ['oi']

const rootReducer = combineReducers({
  messages,
  ui,
  tags,
})

export default rootReducer
