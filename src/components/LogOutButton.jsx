import React from 'react';
import { Link } from 'react-router-dom';
import { clearTokens } from '../auth';

function logOut() {
  if ('serviceWorker' in navigator) {
    window.caches.delete('Charmander-dynamic');
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
