import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Item from './item'

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
]

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

    return (
      <Paper className={classes.paper} square>
        {this
          .getSuggestions(searchTerm, suggestions)
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
