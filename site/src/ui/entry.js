import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import normalizeUrl from 'normalize-url'

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
import Grid from 'material-ui/Grid'
import imagePlaceholder from '../static/placeholder.jpg'

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
  const { classes, theme, data } = props;

  const label = data.join && data.join.includes('resolve')
    ? `@${data.join.split('=')[1]}`
    : data.title

  const info = <div>
    <p>{data.desc.slice(0, 50)}... <span style={{paddingLeft: 20}}>Clique para ver mais</span></p>
  </div>

  return (
    <Tooltip title={info}>
      <Button className={classes.button} raised color="primary" href={normalizeUrl(data.link)} target="_blank">
        {label}
      </Button>
    </Tooltip>
    // <Grid item xs={12} md={6} zeroMinWidth>
    //   <Card className={classes.card}>
    //     <CardHeader
    //       avatar={
    //        <Avatar
    //          // src={data.image}
    //          src={imagePlaceholder}
    //          aria-label="Avatar do grupo"
    //        />
    //       }
    //       // action={
    //       //  <IconButton>
    //       //    <MoreVertIcon />
    //       //  </IconButton>
    //       // }
    //       title={data.title}
    //       subheader={data.tags.join(', ')}
    //     />
    //     <CardContent className={classes.content}>
    //       {/* <Typography>
    //         <PeopleIcon />
    //         {data.participants}
    //       </Typography> */}
    //       <Typography color="secondary">
    //         {data.desc.split(' ').filter(word => word.length <= 30).join(' ')}
    //       </Typography>
    //     </CardContent>
    //     <CardActions>
    //
    //       <Button
    //         color="primary"
    //         href={data.link}
    //         target="_blank"
    //         // component={props => <a href={data.link}>{props.children}</a>}
    //       >
    //        Entrar no grupo
    //       </Button>
    //    </CardActions>
    //   </Card>
    // </Grid>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
