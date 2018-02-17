import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

class Container extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              tg-list
            </Typography>
          </Toolbar>
          <Tabs value={1} onChange={this.handleChange} fullWidth>
            <Tab label="Grupos" />
            <Tab label="Canais" />
            <Tab label="Bots" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Container);
