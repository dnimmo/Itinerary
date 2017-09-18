import md5 from 'js-md5';

import { getToken } from './auth';

import properties from './properties.json';

const url = properties.usersUrl;

const gravatar =
  ({ primaryEmailAddress, emailAddress }, size) => {
    const hash = md5((primaryEmailAddress || emailAddress || '').trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?r=g&s=${size}&d=mm`;
  };


const fetchProfile =
  (updateProfile) => {
    const headers = new Headers();
    headers.append('Authorization', `clickplatform ${getToken()}`);
    const params = {
      method: 'GET',
      headers,
    };
    fetch(url, params).then(response => response.json())
      .then(json => updateProfile({ ...json, image: gravatar(json, 30) }));
  };


export {
  fetchProfile,
  gravatar,
};
