import React from 'react';
import './Profile.scss';
import Input from '@material-ui/core/Input';

const Profile = () => (
  <div>
    <div className="content-over-layout">
      <header className="header px-3 py-2"><h3>Profile</h3></header>
      <div className="content-container mx-3">
        <form>
          <ul className="flex-outer">
            <li>
              <label htmlFor="first-name">Name</label>
              <Input type="text" id="first-name" placeholder="Enter your name here"/>
            </li>
            <li>
              <label htmlFor="last-name">Email</label>
              <Input type="text" id="last-name" placeholder="Enter your email here"/>
            </li>
            <li>
              <label htmlFor="phone">Phone</label>
              <Input type="tel" id="phone" placeholder="Enter your phone here"/>
            </li>
            <li>
              <label htmlFor="email">User ID</label>
              <Input type="email" id="email" placeholder="Enter your User ID here"/>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
);

export default Profile;
