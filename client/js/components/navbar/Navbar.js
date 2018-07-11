import React from 'react';
import './Navbar.scss';
import {NavLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };
  handleSettings = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {anchorEl} = this.state;
    return (
      <div>
        <header className="header-container px-5">
          <div className="logo">
            <a className="text-logo">cryptoKart</a>
          </div>
          <div className="links">
            <nav>
              <ul>
                <li><a href="/app/dashboard" title="Dashboard"><NavLink to='/app/dashboard'
                                                                        activeClassName="active">Dashboard</NavLink></a>
                </li>
                <li><a href="/app/exchange" title="KYC"><NavLink to='/app/exchange'
                                                                 activeClassName="active">Exchange</NavLink></a></li>
                <li><a href="/app/funds" title="KYC"><NavLink to='/app/funds'
                                                              activeClassName="active">Funds</NavLink></a></li>
                {/*<li><a href="/app/settings" title="KYC"><NavLink to='/app/settings'*/}
                                                                 {/*activeClassName="active">Settings</NavLink></a></li>*/}
              </ul>
            </nav>
            <div className="profile-menu">
              <Avatar color="primary" aria-owns={anchorEl ? 'fade-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}>GP</Avatar>
              <Menu
                className="menu-dropdown"
                id="fade-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                TransitionComponent={Fade}>
                <Link to='/app/settings'>
                <MenuItem onClick={this.handleSettings}>Settings</MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>Contact Support</MenuItem>
                <MenuItem onClick={this.handleClose}>Refer a friend</MenuItem>
                <MenuItem onClick={this.handleClose}>Sign out</MenuItem>
              </Menu>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default NavBar;
