import React, {Component} from 'react';
import axios from 'axios';
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrimaryLayout from '../PrimaryLayout';

class App extends Component {
  componentDidMount() {
    axios.defaults.baseURL = 'http://localhost:1337/';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.post('oauth/token', {
      client_id: '7AC8OHL3XD',
      client_secret: 'IUHIAxsBDQXomnFnOSaymoQlLwOKk0',
      username: 'test2001@mailinator.com',
      password: 'password',
      grant_type: 'password',
      userType: 'admin',
      scope: 'admin2'
    })
      .then(function (response) {
        axios.defaults.headers.common['Authorization'] = 'bearer ' + response.data.access_token;
        console.log(response.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
  return (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/app" component={PrimaryLayout}/>
        {/*<AuthorizedRoute path="/app" component={PrimaryLayout} />*/}
        <Redirect to="/app"/>
      </Switch>
    </div>
  </BrowserRouter>
  )
}
}

// const App = () => <PrimaryLayout />;

export default App;
