import {combineReducers} from 'redux'
import ui from './ui'

const messages = (state, action) => ['oi']

const rootReducer = combineReducers({
  messages,
  ui,
})

export default rootReducer
