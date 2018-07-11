import React from 'react';
import './Bank.scss';
import Button from '@material-ui/core/Button';

const Bank = () => (
  <div>
    <div className="content-over-layout">
      <header className="header px-3 py-2"><h3>Bank Accounts</h3></header>
      <div className="content-container mx-3">
        <div className="sub-header">
          <div className="content-left-sub-header">
            <h3>Linked Accounts</h3>
          </div>
          <div className="content-right-sub-header">
            <Button variant="outlined" color="primary">Link New Accounts</Button>
          </div>
        </div>
        <div className="list-view mt-2">
          <div className="list-item p-1">
          <div className="list-item-approved">
            <Button variant="outlined" color="primary">Approved</Button>
          </div>
            <div className="list-item-bank-name">
              <h5>Axis Bank</h5>
            </div>
            <div className="list-item-account-number">
              <h5> ******1234</h5>
            </div>
            <div className="pr-3">
              <Button color="primary" variant="text">Primary</Button>
            </div>
            <div>
              <Button variant="contained" color="primary">Remove</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Bank;
