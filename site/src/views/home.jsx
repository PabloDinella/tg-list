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
import MenuIcon from 'material-ui-icons/Menu'
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



class HomeView extends React.Component {
  componentDidMount() {
    this.fetchBasedOnParams()
  }

  componentDidUpdate(prevProps) {
    const { match: {params: {letter}}} = this.props
    const { match: {params: {letter: prevLetter}}} = prevProps
    if (letter !== prevLetter) this.fetchBasedOnParams()
  }

  fetchBasedOnParams() {
    const { match: { params: { letter } } } = this.props
    if (letter && letter.length === 1) {
      console.log(letter);
      this.props.changeTab(this.props.match.params.letter.charCodeAt(0) - 65)
    }
  }

  render() {
    const {
      classes,
      selectedTab,
      showAutocomplete,
      searchTerm,
      suggestions,
      tags,
      chats,
      changeTab,
      loadTags,
      loadAllTags,
      changeAutocompleteVisibility,
      updateSearchTerm,
      match: {params: {tag}},
    } = this.props

    const alphabet = Array(...{ length: 26 }).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              tg-list
            </Typography>
          </Toolbar>
          <Toolbar disableGutters style={{paddingLeft: 7, paddingRight: 7, minHeight: 62}}>
            <div className={classes.autocompleteContainer}>
              <SearchBar
                onChange={(term) => { updateSearchTerm(term); console.log('update search term'); }}
                onRequestSearch={() => console.log('onRequestSearch')}
                onFocus={() => { changeAutocompleteVisibility(true) }}
                onBlur={() => { changeAutocompleteVisibility(false) }}
                style={{
                  margin: 0,
                  width: '100%',
                }}
              />
              {showAutocomplete && searchTerm ? (
                <AutoComplete searchTerm={searchTerm} suggestions={suggestions} />
              ) : null}
            </div>
          </Toolbar>
          <div style={{ backgroundColor: 'white', color: 'black' }}>
            <Tabs
              value={selectedTab}
              fullWidth
              indicatorColor="primary"
              textColor="primary"
              scrollable
              onChange={(ev, val) => { changeTab(val) }}
            >
              {alphabet
                .map(letter => <Tab key={`letter_${letter}`} label={letter} />)}
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
              .map((letter, i) => {
                const nextLetter = alphabet[i + 1] || 'Z'
                return (<TagGroup
                  key={`tagGroup_${letter}`}
                  load={i === selectedTab && tags[letter] !== 'loading'}
                  loadTags={() => { loadTags(letter, nextLetter) }}
                  loadAllTags={loadAllTags}
                  data={tags[letter]}
                  chats={chats}
                  highlightTag={tag}
                />)
              })}
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeView))
