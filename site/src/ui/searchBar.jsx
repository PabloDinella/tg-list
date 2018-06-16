import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Input from 'material-ui/Input'
import Paper from 'material-ui/Paper'
import ClearIcon from 'material-ui-icons/Clear'
import SearchIcon from 'material-ui-icons/Search'
import { grey } from 'material-ui/colors'

const getStyles = (props, state) => {
  const { disabled } = props
  const { value } = state
  const nonEmpty = value.length > 0

  return {
    root: {
      height: 48,
      display: 'flex',
      justifyContent: 'space-between',
    },
    iconButtonClose: {
      style: {
        opacity: !disabled ? 0.54 : 0.38,
        transform: nonEmpty ? 'scale(1, 1)' : 'scale(0, 0)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      iconStyle: {
        opacity: nonEmpty ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
    iconButtonSearch: {
      style: {
        opacity: !disabled ? 0.54 : 0.38,
        transform: nonEmpty ? 'scale(0, 0)' : 'scale(1, 1)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        marginRight: -48,
      },
      iconStyle: {
        opacity: nonEmpty ? 0 : 1,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
    input: {
      width: '100%',
    },
    searchContainer: {
      margin: 'auto 16px',
      width: '100%',
    },
  }
}

function debounce(func, delay) {
  let timer = 0;
  return function debouncedFn() {
    if (Date.now() - timer > delay) {
      func.apply(this, arguments);
    }
    timer = Date.now();
  };
}

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      value: this.props.value,
      active: false,
    }
  }

  componentWillMount() {
    const { onChange } = this.props
    this.delayedCallback = debounce(function (event) {
      onChange && onChange(event.target.value)
     }, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ ...this.state, value: nextProps.value })
    }
  }

  handleFocus() {
    this.setState({ focus: true })
    this.props.onFocus && this.props.onFocus()
  }

  handleBlur() {
    this.setState({ focus: false })
    if (this.state.value.trim().length === 0) {
      this.setState({ value: '' })
    }
    this.props.onBlur && this.props.onBlur()
  }

  handleInput(e) {
    e.persist()
    this.setState({ value: e.target.value })
    this.delayedCallback(e)
    // this.props.onChange && this.props.onChange(e.target.value)
  }

  handleCancel() {
    this.setState({ active: false, value: '' })
    this.props.onChange && this.props.onChange('')
  }

  handleKeyPressed(e) {
    if (e.charCode === 13 || e.key === 'Enter') {
      this.props.onRequestSearch(this.state.value)
    }
  }

  render() {
    const styles = getStyles(this.props, this.state)
    const { value } = this.state
    const {
      closeIcon,
      disabled,
      onRequestSearch, // eslint-disable-line
      searchIcon,
      style,
      ...inputProps
    } = this.props

    return (
      <Paper
        style={{
          ...styles.root,
          ...style,
        }}
      >
        <div style={styles.searchContainer}>
          <Input
            {...inputProps}
            onBlur={() => {this.handleBlur()}}
            value={value}
            onChange={(ev) => {this.handleInput(ev)}}
            onKeyUp={(ev) => {this.handleKeyPressed(ev)}}
            onFocus={() => {this.handleFocus()}}
            fullWidth
            style={styles.input}
            disableUnderline
            disabled={disabled}
          />
        </div>
        <IconButton
          style={styles.iconButtonSearch.style}
          disabled={disabled}
        >
          {React.cloneElement(searchIcon, { style: styles.iconButtonSearch.iconStyle })}
        </IconButton>
        <IconButton
          onClick={this.handleCancel}
          style={styles.iconButtonClose.style}
          disabled={disabled}
        >
          {React.cloneElement(closeIcon, { style: styles.iconButtonClose.iconStyle })}
        </IconButton>
      </Paper>
    )
  }
}

SearchBar.defaultProps = {
  closeIcon: <ClearIcon style={{ color: grey[500] }} />,
  disabled: false,
  placeholder: 'Search',
  searchIcon: <SearchIcon style={{ color: grey[500] }} />,
  style: null,
  value: '',
  onChange: null,
  onFocus: null,
  onBlur: null,
}

SearchBar.propTypes = {
  /** Override the close icon. */
  closeIcon: PropTypes.node,
  /** Disables text field. */
  disabled: PropTypes.bool,
  /** Sets placeholder for the embedded text field. */
  placeholder: PropTypes.string,
  /** Fired when the text value changes. */
  onChange: PropTypes.func,
  /** Fired when the search icon is clicked. */
  onFocus: PropTypes.func,
  /** Fired when the search input is focused. */
  onBlur: PropTypes.func,
  /** Fired when the search input is unfocused. */
  onRequestSearch: PropTypes.func.isRequired,
  /** Override the search icon. */
  searchIcon: PropTypes.node,
  /** Override the inline-styles of the root element. */
  style: PropTypes.shape({}),
  /** The value of the text field. */
  value: PropTypes.string,
}
