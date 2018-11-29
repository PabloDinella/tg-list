import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress  from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { changeTab } from '../actions'
import Entry from '../ui/entry'

const styles = {
  root: {
    width: '100%',
  },
  container: {
    padding: 20,
  },
  flex: {
    flex: 1,
  },
  tagLabel: {
    marginTop: 15,
  },
  tagLabelHighlight: {
    marginTop: 15,
    backgroundColor: 'blanchedalmond',
  },
}

class TagGroup extends React.Component {
  componentDidMount() {
    this.loadTags(this.props.loadAllTags)
  }

  componentDidUpdate() {
    const { data } = this.props
    if (!this.props.load || !!(data && data.length)) {
      return
    }
    this.loadTags()
  }

  loadTags(cb) {
    const { load } = this.props
    if (!load) {
      return
    }
    this.props.loadTags()
    if (cb) cb()
  }

  renderTag(tag, chats, className, key) {
    return <div key={key}>
      <Typography className={className} type="body2" gutterBottom>{tag}</Typography>
      {chats[tag] && chats[tag].map(c => <Entry key={`entry_${c.link}`} data={c} />)}
    </div>
  }

  render() {
    const {
      classes, data, chats, highlightTag,
    } = this.props

    if (!data || data === 'loading') {
      return (<div><CircularProgress /></div>)
    }

    return (
      <div className={classes.root}>
        {highlightTag && this.renderTag(highlightTag, chats, classes.tagLabelHighlight)}
        {data
          .filter(tag => tag !== highlightTag)
          .map(tag => this.renderTag(tag, chats, classes.tagLabel, `tag_${tag}`))}
      </div>
    )
  }
}

TagGroup.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loadAllTags: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
  chats: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  messages: state.messages,
  selectedTab: state.ui.selectedTab,
})

const mapDispatchToProps = {
  changeTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagGroup))
