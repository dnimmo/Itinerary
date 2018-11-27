import { combineReducers } from 'redux';
import { bookings } from './bookings';
import { profile } from './profile';
import { upcomingCalendar } from './upcomingCalendar';

const rootReducer = combineReducers({
  bookings,
  profile,
  upcomingCalendar,
});

export default rootReducer;
