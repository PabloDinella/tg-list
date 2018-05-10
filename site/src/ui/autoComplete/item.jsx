import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import { Link } from 'react-router-dom'

export default function ({
  suggestion, index, itemProps, highlightedIndex, selectedItem,
}, context) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      onClick={() => {
        console.log('mmmmmmmm')
        // context.history.push(`/${suggestion.label}`)
      }}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

// renderSuggestion.propTypes = {
//   highlightedIndex: PropTypes.number,
//   index: PropTypes.number,
//   itemProps: PropTypes.object,
//   selectedItem: PropTypes.string,
//   suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
// }
