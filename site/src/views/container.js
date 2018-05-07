import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import {connect} from 'react-redux'
import {changeTab, loadTags, loadAllTags} from '../actions'
import SwipeableViews from 'react-swipeable-views'
import TagGroup from './tagGroup'
import SearchBar from 'material-ui-search-bar'
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';

const styles = (theme) => ({
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
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },

});

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];


function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class Container extends React.Component {
  render() {
    const { classes, children, selectedTab, tags, chats, changeTab, loadTags, loadAllTags } = this.props;

    const alphabet = Array.apply(null, {length: 26}).map((x, i) => String.fromCharCode(65 + i))

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
                onChange={() => console.log('onChange')}
                onRequestSearch={() => console.log('onRequestSearch')}
                style={{
                  margin: 0,
                  width: '100%'
                }}
              />
              {true ? (
                <Paper className={classes.paper} square>
                  {getSuggestions('a').map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      // itemProps: getItemProps({ item: suggestion.label }),
                      // highlightedIndex,
                      // selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
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
                  load={i === selectedTab && tags[letter] !== 'loading'}
                  loadTags={() => {loadTags(letter, nextLetter)}}
                  loadAllTags={loadAllTags}
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
  loadTags,
  loadAllTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container));
