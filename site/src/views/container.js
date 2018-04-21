import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import {connect} from 'react-redux'
import {changeTab} from '../actions'
import SwipeableViews from 'react-swipeable-views'
import TagGroup from './tagGroup'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const styles = {
  root: {
    width: '100%',
  },
  container: {
    padding: 20,
  },
  flex: {
    flex: 1,
  },
};

const db = firebase.initializeApp({
  apiKey: "AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A",
  authDomain: "tg-list.firebaseapp.com",
  databaseURL: "https://tg-list.firebaseio.com",
  projectId: "tg-list",
  storageBucket: "tg-list.appspot.com",
  messagingSenderId: "983638119768"
});

class Container extends React.Component {
  render() {
    const { classes, children, selectedTab, changeTab } = this.props;

    console.log(this.props);

    const alphabet = Array.apply(null, {length: 26}).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              tg-list
            </Typography>
          </Toolbar>
          <div style={{backgroundColor: 'white', color: 'black'}}>
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="primary"
              textColor="primary"
              scrollable
              onChange={(ev, val) => {changeTab(val)}}
            >
              {alphabet
                .map(letter => <Tab label={letter} />)}
            </Tabs>
          </div>
        </AppBar>
        <div className={classes.container}>
          <SwipeableViews
            index={selectedTab}
            onChangeIndex={(index) => {changeTab(index)}}
          >
            {alphabet
              .map((letter, i) => <TagGroup index={i} load={i === selectedTab} db={db.firestore()} />)}
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  selectedTab: state.ui.selectedTab
})

const mapDispatchToProps = {
  changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container));
