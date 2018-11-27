import moment from 'moment';
import properties from './properties.json';

const url = properties.authUrl;
const responseType = 'response_type=token';
const clientId = `client_id=${properties.clientId}`;
const scope = 'scope=Default';
const redirectUri = properties.redirectUri;
const appState = 'state=';

const stateStorageKey = 'o.sid';
const accessTokenKey = 'o.at';
const accessTokenExpiryKey = 'o.exp';
const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateRandomId =
  () => new Array(75).fill(true).map(() => validChars[Math.floor(Math.random() * validChars.length)]).join('');

const createState =
  finalDestination => ({
    id: generateRandomId(),
    redirectUrl: finalDestination,
  });

const encodeState =
  stateToEncode => btoa(JSON.stringify(stateToEncode));

const decodeState =
  stateToDecode => JSON.parse(atob(decodeURIComponent(stateToDecode)));

const makeAuthorisationRequest =
  currentState => `${url}${responseType}&${clientId}&${scope}&${redirectUri}&${appState}${encodeState(currentState)}`;

const startImplicitFlow =
  (finalDestination) => {
    const currentState = createState(finalDestination);
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(stateStorageKey, currentState.id);
    return makeAuthorisationRequest(currentState);
  };

const clearTokens =
  () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(accessTokenExpiryKey);
  };

const endImplicitFlow =
  ({ returnedState, token, ttl }) => {
    const { id, redirectUrl } = decodeState(returnedState);
    if (localStorage.getItem(stateStorageKey) === id) {
      localStorage.setItem(accessTokenKey, token);
      localStorage.setItem(accessTokenExpiryKey, moment().add(ttl, 's'));
      localStorage.removeItem(stateStorageKey);
      return redirectUrl;
    }
    return false;
  };

const checkForValidToken =
  () => {
    if (localStorage.getItem(accessTokenKey)) {
      const expiry = localStorage.getItem(accessTokenExpiryKey);
      return expiry && Date.now() < Date.parse(expiry);
    }
    return false;
  };

const checkForToken =
  () => localStorage.getItem(accessTokenKey);


const getToken =
  () => localStorage.getItem(accessTokenKey);

export {
  getToken,
  checkForValidToken,
  startImplicitFlow,
  endImplicitFlow,
  checkForToken,
  clearTokens,
};
