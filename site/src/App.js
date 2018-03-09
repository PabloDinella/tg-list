import React, { Component } from 'react';
import { Set } from 'immutable'
import Container from './views/container'
import Entry from './ui/entry'
import firebase from 'api/firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createMuiTheme} from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import Typography from 'material-ui/Typography'
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
    this.setState({ messages: all.grupo });
    // this.setState({
    //   messages: List(all.grupo.map(i => {
    //     const rm = i.tags.indexOf('Grupo')
    //     if (rm !== -1) {
    //       return {
    //         ...i,
    //         tags: i.tags.splice(rm, rm)
    //       }
    //     }
    //     return i
    //   })).groupBy(item => item.tags)
    // });
  }
  // addMessage(e){
    // e.preventDefault(); // <- prevent form submit from reloading the page
    // /* Send the message to Firebase */
    // firebase.database().ref('messages').push( this.inputEl.value );
    // this.inputEl.value = ''; // <- clear the input
  // }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          {Set(this.state.messages.reduce((
            initial,
            curr,
          ) => {
            return [
              ...initial,
              ...curr.tags,
            ]
          }, [])).map(tag => {
            if (tag === 'Grupo') return
            return (
              <div>
                <Typography type="body2" gutterBottom>{tag}</Typography>
                <Grid style={{margin: '10px 0 30px'}} container>
                  {this.state.messages.filter(message => {
                    return message.tags.includes(tag)
                  }).map(i => <Entry data={i} />)}
                </Grid>
              </div>
            )
          })}
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
