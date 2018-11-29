import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Item from './item'

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 1,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
})

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
class AutoComplete extends Component {
  state = {
    filteredSuggestions: []
  }

  // componentDidUpdate(prevProps) {
  //   const {searchTerm} = this.props
  //   if (prevProps.searchTerm !== searchTerm) {
  //     // this.getSuggestions(searchTerm, this.props.suggestions)
  //   }
  // }

  // getDerivedStateFromProps(props, state) {
  //
  // }

  getSuggestions(inputValue, suggestions) {
    let count = 0

    return suggestions.filter((suggestion) => {
      const keep =
        (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
        count < 5

      if (keep) {
        count += 1
      }

      return keep
    })
  }

  render() {
    const {
      classes,
      searchTerm,
      suggestions
    } = this.props

    const filteredSuggestions = this.getSuggestions(searchTerm, suggestions)

    if (!filteredSuggestions.length) {
      // this.getSuggestions(searchTerm, suggestions)
      return (
        <Paper className={classes.paper} square>
          carregando
        </Paper>
      );
    }

    return (
      <Paper className={classes.paper} square>
        {filteredSuggestions
          .map((suggestion, index) => (
            <Item
              suggestion={suggestion}
              index={index}
            />
          ))}
          {/* // renderSuggestion({
          //   suggestion,
          //   index,
          //   // itemProps: getItemProps({ item: suggestion.label }),
          //   // highlightedIndex,
          //   // selectedItem: selectedItem2,
          // }) */}
      </Paper>
    )
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf({}).isRequired,
}

export default withStyles(styles)(AutoComplete)
