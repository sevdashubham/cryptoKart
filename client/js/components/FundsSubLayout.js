import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FundsNav from './fundsNavBar/FundsNav'
import './FundsSubLayout.scss';

// Sub Layouts
import Funds from './funds/Funds';
import TransactionHistory from './transactionHistory/TransactionHistory';

const FundsSubLayout = ({ match }) => (
  <div className="funds-sub-layout px-5 pt-3">
    <div>
      <h3>Funds & Transaction History</h3>
    </div>
    <div>
      <FundsNav />
    </div>
    <div className="primary-content">
      <Switch>
        <Route path={`${match.path}`} exact component={Funds} />
        <Route path={`${match.path}/transactions`}  component={TransactionHistory} />
      </Switch>
    </div>
  </div>
);

export default FundsSubLayout;
