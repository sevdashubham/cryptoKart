import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import './FundsNav.scss'

const FundsNav = ({match}) => (
  <nav className="context-funds-nav">
    <span className="funds-estimated-value">
      <h5>Estimated Value: $9,999 USD | 1.503 BTC</h5>
    </span>
    <span className="funds-nav-list">
    <ul>
      <li><NavLink to={`${match.path}`} exact activeClassName="active">Funds </NavLink></li>
      <li>&nbsp;|&nbsp;</li>
      <li><NavLink to={`${match.path}/transactions`} activeClassName="active"> Transaction History</NavLink></li>
    </ul>
    </span>
  </nav>
);

export default withRouter(FundsNav)
