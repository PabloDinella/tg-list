import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  button: {
    margin: 7,
    textTransform: 'none',
  },
  card: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
})

function MediaControlCard(props) {
  const { classes, data } = props

  const label = data.join && data.join.includes('resolve')
    ? `@${data.join.split('=')[1]}`
    : data.title

  const info = (
    <div>
      <p>{data.desc.slice(0, 50)}... <span style={{ paddingLeft: 20 }}>Clique para ver</span></p>
    </div>
  )

  return (
    <Tooltip title={info}>
      <Button
        className={classes.button}
        color="primary"
        href={data.link}
        target="_blank"
        variant="raised"
      >
        {label}
      </Button>
    </Tooltip>
  )
}

MediaControlCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
}

export default withStyles(styles, { withTheme: true })(MediaControlCard)
