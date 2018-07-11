import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import './SettingsNav.scss'

const SettingsNav = ({match}) => (
  <nav className="context-nav">
    <ul>
      <li>Settings</li>
      <li><NavLink to={`${match.path}/profile`} activeClassName="active">Profile</NavLink></li>
      <li><NavLink to={`${match.path}/security`} activeClassName="active">Security</NavLink></li>
      <li><NavLink to={`${match.path}/bank`} activeClassName="active">Bank</NavLink></li>
      <li><NavLink to={`${match.path}/kyc`} activeClassName="active">KYC</NavLink></li>
      <li><NavLink to={`${match.path}`} exact activeClassName="active">Referral</NavLink></li>
      <li>API(coming soon)</li>
    </ul>
  </nav>
)

export default withRouter(SettingsNav)
