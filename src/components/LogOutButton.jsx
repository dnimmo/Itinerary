import React from 'react';
import { Link } from 'react-router-dom';
import { clearTokens } from '../auth';
import { serviceWorkerVersion } from '../properties.json';

function logOut() {
  if ('serviceWorker' in navigator) {
    window.caches.delete(`${serviceWorkerVersion}-dynamic`);
  }
  clearTokens();
  window.location.replace('/');
}

const LogOutButton =
  () => (
    <Link className="log-out-button" onClick={logOut} to="/">
      Yes, log me out
    </Link>
  );

export default LogOutButton;
