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
  container: {
    padding: 20,
  },
  flex: {
    flex: 1,
  },
};


class Container extends React.Component {
  render() {
    const { classes, children } = this.props;

    const alphabet = Array.apply(null, {length: 26}).map((x, i) => String.fromCharCode(65 + i))

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              tg-list
            </Typography>
          </Toolbar>
          <div style={{backgroundColor: 'white', color: 'black'}}>
            <Tabs
              value={1}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="primary"
              textColor="primary"
              scrollable
            >
              {alphabet
                .map(letter => <Tab label={letter} />)}
            </Tabs>
          </div>
        </AppBar>
        <div className={classes.container}>
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
