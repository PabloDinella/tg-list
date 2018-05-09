import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import Typography from 'material-ui/Typography'
import { blue, red } from 'material-ui/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import mySaga from './sagas'
import Container from './views/container'
import rootReducer from './reducer'
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(mySaga)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: ['um', 'dois'] }
  }
  // componentWillMount(){
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A",
  //     authDomain: "tg-list.firebaseapp.com",
  //     databaseURL: "https://tg-list.firebaseio.com",
  //     projectId: "tg-list",
  //     storageBucket: "tg-list.appspot.com",
  //     messagingSenderId: "983638119768"
  //   });
  //
  //   var db = firebase.firestore();
  //   db.collection('tags').limit(10).get().then(snapshot => {
  //     this.setState({ messages: snapshot.docs.map(doc => doc.id)})
  //   })
  // }
  render() {
    if (!this.state.messages) {
      return (<div>loading...</div>)
    }
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
}

export default App
