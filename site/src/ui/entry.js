import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Grid from 'material-ui/Grid'

const styles = theme => ({
  card: {
    // display: 'flex',
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

  return (
    <Grid item xs={12} md={6} zeroMinWidth>
      <Card className={classes.card}>
        <CardHeader
          avatar={
           <Avatar
             src="https://tgram.io/media/group_images/Bjk6jKHjc2HKSIpDMxVTutxYj0w1Qc5vAnl-SZO38sCr9s_okKBT5sDCiemojZqRhOxh0Qv7amJ_CQ1PxNa.jpg.120x120_q85_crop.jpg"
             aria-label="Recipe"
           />
          }
          // action={
          //  <IconButton>
          //    <MoreVertIcon />
          //  </IconButton>
          // }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent className={classes.content}>
          <Typography>
            {data.desc.split(' ').filter(word => word.length <= 30).join(' ')}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
