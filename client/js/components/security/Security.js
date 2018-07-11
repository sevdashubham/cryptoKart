import React from 'react';
import './Security.scss';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const Security = () => (
  <div>
    <div className="content-over-layout">
      <header className="header px-3 py-2"><h3>Security</h3></header>
      <div className="content-container mx-3">
        <div className="sub-header-bar">
          <h4>Password</h4>
        </div>
        <div className="p-2 same-line-flex">
          <h5>Login Password</h5>
          <Button className="ml-4" variant="contained" size="small" color="primary">Change</Button>
        </div>
        <div className="sub-header-bar">
          <h4>Two-Factor Authentication</h4>
        </div>
        <div className="p-2 same-line-flex">
          <h5>2FA: Disabled</h5>
          <Button className="ml-4" variant="contained" size="small" color="primary">Change</Button>
        </div>
        <div className="sub-header-bar">
          <h4>Preferences</h4>
        </div>
        <div className="p-2">
          <h5>Decide what actions require 2FA approval and what actions require email notification</h5>
        </div>
        <div className="p-2 preferences">
          <div className="preference-tab-1">
            <h6>Action</h6>
            <h5 className="py-2">Sign In</h5>
            <h5 className="py-2">Deposit/Withdrawal FIAT</h5>
            <h5 className="py-2">Deposit/Withdrawal Crypto</h5>
            <h5 className="py-2">Trading</h5>
          </div>
          <div className="preference-tab-2">
            <h6>2FA</h6>
            <Checkbox className="strict-padding" color="primary"/>
            <Checkbox color="primary"/>
            <Checkbox color="primary"/>
            <Checkbox color="primary"/>
          </div>
          <div className="preference-tab-3">
            <h6>Notification</h6>
            <Checkbox color="primary"/>
            <Checkbox color="primary"/>
            <Checkbox color="primary"/>
            <Checkbox color="primary"/>
          </div>
        </div>
        <div className="sub-header-bar">
          <h4>Account Activity</h4>
        </div>
        <div className="p-2 account-activity">
          <div className="account-activity-tab-1">
            <h6>Action</h6>
            <h5>Sign In</h5>
          </div>
          <div className="account-activity-tab-2">
            <h6>IP Address</h6>
            <h5>0.0.0.0</h5>
          </div>
          <div className="account-activity-tab-3">
            <h6>Location</h6>
            <h5>Mumbai, India</h5>
          </div>
          <div className="account-activity-tab-4">
            <h6>Time & Date</h6>
            <h5>2018-06-12 01:40:59</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Security;
