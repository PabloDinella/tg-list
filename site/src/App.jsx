import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import createPalette from '@material-ui/core/styles/createPalette'
import { blue, red } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router } from 'react-router-dom'
import mySaga from './sagas'
import Container from './views/container'
import rootReducer from './reducer'
import Teste from './ui/Teste'

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: red,
    type: 'light',
  }),
  linkColor: '#2969b0',
  navbar: {
    title: {
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
  },
  bible: {
    fontFamily: 'Lora, serif',
  },
})

const sagaMiddleware = createSagaMiddleware()
// eslint-disable-next-line no-undef, no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(mySaga)

const App = () => {
  console.log('oi', Router)
  return (
    <Router>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Container />
        </MuiThemeProvider>
      </Provider>
    </Router>
  )
}

export default App
