import React from 'react';
import './TransactionHistory.scss';

const TransactionHistory = () => (
  <div className="pt-3">
    <ul className="flex-container-transaction">
      <li className="flex-item-transaction">Date</li>
      <li className="flex-item-transaction">Coin</li>
      <li className="flex-item-transaction">Name</li>
      <li className="flex-item-transaction">Type</li>
      <li className="flex-item-transaction">Amount</li>
      <li className="flex-item-transaction">Status</li>
      <li className="flex-item-transaction"></li>
    </ul>
    <ul className="flex-container-transaction">
      <li className="flex-item-transaction">21-02-2018</li>
      <li className="flex-item-transaction">BTC</li>
      <li className="flex-item-transaction">Bitcoin</li>
      <li className="flex-item-transaction">Deposit</li>
      <li className="flex-item-transaction">1.000</li>
      <li className="flex-item-transaction">Pending</li>
      <li className="flex-item-transaction"><i className="fas fa-info-circle"></i></li>
    </ul>
  </div>
);

export default TransactionHistory;
