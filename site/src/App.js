import React, { Component } from 'react';
import Container from './views/container'
import Entry from './ui/entry'
import firebase from 'api/firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createMuiTheme} from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import {blue, red} from 'material-ui/colors'
import Grid from 'material-ui/Grid'
import all from './entries.json'

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
    // let messagesRef = firebase.database().ref('grupo').orderByKey().limitToLast(100);
    // messagesRef.on('child_added', snapshot => {
    //   let message = { text: snapshot.val(), id: snapshot.key };
    //   this.setState({ messages: [message].concat(this.state.messages) });
    // })
    this.setState({ messages: all.grupo.slice(0, 10) });
  }
  addMessage(e){
    // e.preventDefault(); // <- prevent form submit from reloading the page
    // /* Send the message to Firebase */
    // firebase.database().ref('messages').push( this.inputEl.value );
    // this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Grid container>
            {this.state.messages.map(message => <Entry data={message} />)}
          </Grid>
        </Container>
      </MuiThemeProvider>
      // <form onSubmit={this.addMessage.bind(this)}>
      //   <input type="text" ref={ el => this.inputEl = el }/>
      //   <input type="submit"/>
      // </form>
    );
  }
}

export default App;
