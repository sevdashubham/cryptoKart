import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SettingsNav from './settingsNavbar/SettingsNav'
import './SettingsSubLayout.scss';

// Sub Layouts
import Profile from './profile/Profile';
import Security from './security/Security';
import Bank from './bank/Bank';
import Referral from './referral/Referral';
import KYC from './kyc/Kyc';


const SettingsSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <SettingsNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={`${match.path}/profile`}  component={Profile} />
        <Route path={`${match.path}/security`}  component={Security} />
        <Route path={`${match.path}/bank`}  component={Bank} />
        <Route path={match.path} exact component={Referral} />
        <Route path={`${match.path}/kyc`}  component={KYC} />
        {/*<Route path={`${match.path}/api`}  component={KYC} />*/}
      </Switch>
    </div>
  </div>
)

export default SettingsSubLayout;
