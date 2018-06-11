import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Route, withRouter } from 'react-router-dom'
import { changeTab, changeAutocompleteVisibility, updateSearchTerm, loadTags, loadAllTags } from '../actions'
import HomeView from './home'

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
    const { classes } = this.props

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
