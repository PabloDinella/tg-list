import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import { Route } from 'react-router-dom'
import TagGroup from './tagGroup'
import SearchBar from '../ui/searchBar'
import AutoComplete from '../ui/autoComplete'
import { changeTab, changeAutocompleteVisibility, updateSearchTerm, loadTags, loadAllTags } from '../actions'

const styles = theme => ({
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



class TagView extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.tag);
  }

  render() {
    const {
      classes,
      match: {params: {tag: tag}},
    } = this.props

    const alphabet = Array(...{ length: 26 }).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton component={Link} to="/" className={classes.menuButton} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {tag}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <div className={classes.container}>
          <SwipeableViews
            className={classes.swipeableViews}
            index={selectedTab}
            onChangeIndex={(index) => { changeTab(index) }}
          >
            {alphabet
              .slice(0, 3)
              .map((letter, i) => {
                const nextLetter = alphabet[i + 1] || 'Z'
                return (<TagGroup
                  load={i === selectedTab && tags[letter] !== 'loading'}
                  loadTags={() => { loadTags(letter, nextLetter) }}
                  loadAllTags={loadAllTags}
                  data={tags[letter]}
                  chats={chats}
                />)
              })}
          </SwipeableViews>
        </div> */}
      </div>
    )
  }
}

TagView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagView))
