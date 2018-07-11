import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './navbar/Navbar';
import SettingsSubLayout from './SettingsSubLayout';

import Dashboard from './dashboard/Dashboard';
import Exchange from './exchange/Exchange';
import FundsSubLayout from './FundsSubLayout';

const PrimaryLayout = ({ match }) =>  (
      <div>
        <NavBar/>
        <main>
          <Switch>
            <Route path={`${match.path}/dashboard`} exact component={Dashboard}/>
            <Route path={`${match.path}/funds`} component={FundsSubLayout}/>
            <Route path={`${match.path}/exchange`} component={Exchange}/>
            <Route path={`${match.path}/settings`} component={SettingsSubLayout}/>
            <Redirect to={`${match.url}`} />
          </Switch>
        </main>
      </div>
  )

export default PrimaryLayout
