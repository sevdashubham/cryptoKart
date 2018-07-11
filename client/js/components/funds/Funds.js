import React from 'react';
import './Funds.scss';
import Button from '@material-ui/core/Button';

const Funds = () => (
  <div className="pt-3">
    <ul className="flex-container-funds">
      <li className="flex-item-funds">Coin</li>
      <li className="flex-item-funds">Name</li>
      <li className="flex-item-funds">Total Balance</li>
      <li className="flex-item-funds">Available Balance</li>
      <li className="flex-item-funds">In Orders</li>
      <li className="flex-item-funds">USD Value</li>
       <li className="flex-item-funds"></li>
       <li className="flex-item-funds"></li>
    </ul>
    <ul className="flex-container-funds">
      <li className="flex-item-funds">BTC</li>
      <li className="flex-item-funds">Bitcoin</li>
      <li className="flex-item-funds">1.000</li>
      <li className="flex-item-funds">1.000</li>
      <li className="flex-item-funds">0.000</li>
      <li className="flex-item-funds">$6,500</li>
       <li className="flex-item-funds"><Button variant="outlined" color="primary">Deposit</Button></li>
       <li className="flex-item-funds"><Button variant="contained" color="primary">Withdraw</Button></li>
    </ul>
  </div>
);

export default Funds;
