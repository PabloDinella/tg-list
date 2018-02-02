import React, { Component } from 'react';
import Container from './views/container'
import firebase from 'api/firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createMuiTheme} from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import {blue, red} from 'material-ui/colors'

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    let messagesRef = firebase.database().ref('grupo').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    firebase.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container />
        <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <li key={message.id}>{JSON.stringify(message.text, null, 2)}</li> )
          }
        </ul>
      </MuiThemeProvider>
      // <form onSubmit={this.addMessage.bind(this)}>
      //   <input type="text" ref={ el => this.inputEl = el }/>
      //   <input type="submit"/>
      // </form>
    );
  }
}

export default App;
