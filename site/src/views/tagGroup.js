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


class TagGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentWillUpdate() {
    const {db, load} = this.props
    if (!load) {
      return
    }
    if (this.state.messages.length) {
      return
    }
    const letter = String.fromCharCode(65 + this.props.index)
    const letterEnd = String.fromCharCode(65 + this.props.index + 1)
    db.collection('tags').orderBy('label').startAt(letter).endAt(letterEnd).get().then(snapshot => {
      this.setState({ messages: snapshot.docs.map(doc => doc.id)})
    })
  }

  render() {
    const {classes, index, load, db} = this.props;

    if (!load) {
      return <div>no</div>
    }
    console.log(this.state);

    const letter = String.fromCharCode(65 + index)

    return (
      <div className={classes.root}>
        {letter}
        {this.state.messages}
      </div>
    );
  }
}

TagGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  selectedTab: state.ui.selectedTab
})

const mapDispatchToProps = {
  changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagGroup));
