import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';

import UpcomingCalendar from './pages/UpcomingCalendar';
import FlightDetail from './pages/FlightDetail';
import HotelDetail from './pages/HotelDetail';
import TrainDetail from './pages/TrainDetail';
import TravelcardDetail from './pages/TravelcardDetail';
import VehicleDetail from './pages/VehicleDetail';
import LogOut from './pages/LogOut';

// import { updateBookings as updateBookingsFunction } from './reducers/bookingsReducer';
// import { updateProfile as updateProfileFunction } from './reducers/profileReducer';
//
// import fetchBookings from './bookings';
// import { fetchProfile } from './profile';

const App =
  () => (<div className="App">
    <Switch>
      <Route exact path="/" component={UpcomingCalendar} />
      <Route path="/upcoming-calendar" component={UpcomingCalendar} />
      <Route path="/flight-detail/:bookingID" component={FlightDetail} />
      <Route path="/hotel-detail/:bookingID" component={HotelDetail} />
      <Route path="/train-detail/:bookingID" component={TrainDetail} />
      <Route path="/travelcard-detail/:bookingID" component={TravelcardDetail} />
      <Route path="/carhire-detail/:bookingID" component={VehicleDetail} />
      <Route path="/log-out" component={LogOut} />
    </Switch>
  </div>);

// App.propTypes = {
//   updateBookings: PropTypes.func,
//   updateProfile: PropTypes.func,
//   bookingsFetched: PropTypes.bool.isRequired,
//   profileFetched: PropTypes.bool.isRequired,
// };
//
// App.defaultProps = {
//   updateBookings: updateBookingsFunction,
//   updateProfile: updateProfileFunction,
// };

export default App;

// export default connect(
//   ({ bookingsReducer, profileReducer }) => ({
//     bookingsFetched: bookingsReducer.fetched,
//     profileFetched: profileReducer.fetched,
//   }),
//   dispatch => bindActionCreators({ updateBookings: updateBookingsFunction,
//     updateProfile: updateProfileFunction }, dispatch),
// )(App);

