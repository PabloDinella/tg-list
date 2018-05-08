import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import PeopleIcon from 'material-ui-icons/People';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Grid from 'material-ui/Grid';
import imagePlaceholder from '../static/placeholder.jpg';

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
});

function MediaControlCard(props) {
  const { classes, data } = props;

  const label = data.join && data.join.includes('resolve')
    ? `@${data.join.split('=')[1]}`
    : data.title;

  const info = (<div>
    <p>{data.desc.slice(0, 50)}... <span style={{ paddingLeft: 20 }}>Clique para ver</span></p>
                </div>);

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
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
