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
import TagGroup from './tagGroup'
import SearchBar from '../ui/searchBar'
import AutoComplete from '../ui/autoComplete'
import { changeTab, changeAutocompleteVisibility, updateSearchTerm, loadTags, loadAllTags } from '../actions'

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
      classes, children, selectedTab, showAutocomplete, searchTerm, tags, chats, changeTab, loadTags, loadAllTags, changeAutocompleteVisibility, updateSearchTerm,
    } = this.props

    const alphabet = Array(...{ length: 26 }).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              tg-list
            </Typography>
          </Toolbar>
          <Toolbar>
            <div className={classes.autocompleteContainer}>
              <SearchBar
                onChange={(term) => { updateSearchTerm(term) }}
                onRequestSearch={() => console.log('onRequestSearch')}
                onFocus={() => { changeAutocompleteVisibility(true) }}
                onBlur={() => { changeAutocompleteVisibility(false) }}
                style={{
                  margin: 0,
                  width: '100%',
                }}
              />
              {showAutocomplete && searchTerm ? (
                <AutoComplete searchTerm={searchTerm} />
              ) : null}
            </div>
          </Toolbar>
          <div style={{ backgroundColor: 'white', color: 'black' }}>
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="primary"
              textColor="primary"
              scrollable
              onChange={(ev, val) => { changeTab(val) }}
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
        </div>
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
})

const mapDispatchToProps = {
  changeTab,
  loadTags,
  loadAllTags,
  changeAutocompleteVisibility,
  updateSearchTerm,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container))
