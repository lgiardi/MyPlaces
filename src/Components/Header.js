import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Header extends Component {

  handleMenu = event => {
     console.log("Add new Place")
   };

  render(){
    const { classes } = this.props;

    return <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit"
                  className={classes.grow}>
            {this.props.title}
          </Typography>
          <Link
            to="/create"
            >

          <IconButton
              //onClick={this.props.onNavigation}
              color="inherit"
          >
            <AccountCircle />
          </IconButton>
          </Link>
        </Toolbar>

      </AppBar>
    </div>
  }
}

export default withStyles(styles)(Header)
