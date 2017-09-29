import { getToken } from './auth';
import properties from './properties.json';

const url = properties.travelUrl;

const fetchBookings =
  (updateBookings) => {
    const headers = new Headers();
    headers.append('Authorization', `clickplatform ${getToken()}`);
    const params = {
      method: 'GET',
      headers,
    };
    fetch(url, params)
      .then(response => response.json())
      .then(json => updateBookings(json.items));
  };

export default fetchBookings;
