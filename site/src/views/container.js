import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import {connect} from 'react-redux'
import {changeTab, loadTags} from '../actions'
import SwipeableViews from 'react-swipeable-views'
import TagGroup from './tagGroup'

const styles = {
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    padding: 20,
    flex: '1',
  },
  swipeableViews: {
    height: '100%',
  },
  flex: {
    flex: 1,
  },
};

class Container extends React.Component {
  render() {
    const { classes, children, selectedTab, tags, chats, changeTab, loadTags } = this.props;

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
            className={classes.swipeableViews}
            index={selectedTab}
            onChangeIndex={(index) => {changeTab(index)}}
          >
            {alphabet
              .slice(0, 3)
              .map((letter, i) => {
                const nextLetter = alphabet[i+1] || 'Z'
                return <TagGroup
                  load={i === selectedTab && !tags[letter]}
                  loadTags={() => {loadTags(letter, nextLetter)}}
                  data={tags[letter]}
                  chats={chats}
                />
              })}
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
  selectedTab: state.ui.selectedTab,
  tags: state.tags,
  chats: state.chats,
})

const mapDispatchToProps = {
  changeTab,
  loadTags
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container));
