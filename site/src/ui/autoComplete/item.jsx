import React from 'react'
import { withRouter } from 'react-router-dom'
import { MenuItem } from 'material-ui/Menu'
import { Link } from 'react-router-dom'

export default withRouter(({
  suggestion, index, itemProps, highlightedIndex, selectedItem, history
}) => {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      onClick={() => {
        history.push(`/${suggestion.label}`)
      }}
      component="div"
      onMouseDown={() => { history.push(`/${suggestion.label[0]}/${suggestion.label}`)}}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
})

// renderSuggestion.propTypes = {
//   highlightedIndex: PropTypes.number,
//   index: PropTypes.number,
//   itemProps: PropTypes.object,
//   selectedItem: PropTypes.string,
//   suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
// }
