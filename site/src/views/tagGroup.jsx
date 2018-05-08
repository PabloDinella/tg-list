import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
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

  render() {
    const {
      classes, data, chats,
    } = this.props

    if (!data || data === 'loading') {
      return (<div><CircularProgress /></div>)
    }

    return (
      <div className={classes.root}>
        {data.map(tag => (
          <div>
            <Typography className={classes.tagLabel} type="body2" gutterBottom>{tag}</Typography>
            {chats[tag].map(c => <Entry data={c} />)}
          </div>
        ))}
      </div>
    )
  }
}

TagGroup.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loadAllTags: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf.isRequired,
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
