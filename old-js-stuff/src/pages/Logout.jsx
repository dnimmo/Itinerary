import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../components/LogOutButton';

const Logout =
  () => (
    <div className="logout-panel">
      <p>Are you sure you want to log out?</p>
      <p className="detail">This will clear all of your offline data</p>
      <Link to={'/upcoming-calendar'} className="go-back-button">No, take me back</Link>
      <LogOutButton />
    </div>
  );

export default Logout;
