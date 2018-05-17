import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import MenuIcon from 'material-ui-icons/Menu'
import { Route, withRouter } from 'react-router-dom'
import TagGroup from './tagGroup'
import SearchBar from '../ui/searchBar'
import AutoComplete from '../ui/autoComplete'
import { changeTab, changeAutocompleteVisibility, updateSearchTerm, loadTags, loadAllTags } from '../actions'
import HomeView from './home'
import TagView from './tag'

const styles = theme => ({
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  swipeableViews: {
    height: '100%',
  },
  flex: {
    flex: 1,
  },

  autocompleteContainer: {
    position: 'relative',
    width: '100%',
  },

})



class Container extends React.Component {
  render() {
    const {
      classes, children, selectedTab, showAutocomplete, searchTerm, suggestions, tags, chats, changeTab, loadTags, loadAllTags, changeAutocompleteVisibility, updateSearchTerm,
    } = this.props

    const alphabet = Array(...{ length: 26 }).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div className={classes.root}>
        <Route path="/:letter?/:tag?" exact component={HomeView} />
        {/* <Route path="/:tag" exact component={TagView} /> */}
      </div>
    )
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  messages: state.messages,
  selectedTab: state.ui.selectedTab,
  tags: state.tags,
  chats: state.chats,
  showAutocomplete: state.ui.showAutocomplete,
  searchTerm: state.search.term,
  suggestions: state.allTags,
})

const mapDispatchToProps = {
  changeTab,
  loadTags,
  loadAllTags,
  changeAutocompleteVisibility,
  updateSearchTerm,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container)))
