import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {CircularProgress} from 'material-ui/Progress';
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
  componentDidMount() {
    this.loadTags()
  }

  componentDidUpdate() {
    if (!this.props.load) {
      return
    }
    // this.loadTags()
  }

  loadTags() {
    const {data, load} = this.props
    console.log('mmmm', load, data);
    if (!load) {
      return
    }
    // if (data && data.length > 0) {
    //   return
    // }
    this.props.loadTags();
  }

  render() {
    const {classes, load, data} = this.props;

    if (!data || data.loading) {
      return <div>
        <CircularProgress />
      </div>
    }

    return (
      <div className={classes.root}>
        {data.map(tag => <div>
          <Typography type="body2" gutterBottom>{tag}</Typography>
        </div>)}
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
