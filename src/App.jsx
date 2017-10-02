import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import UpcomingCalendar from './pages/UpcomingCalendar';
import FlightDetail from './pages/FlightDetail';
import HotelDetail from './pages/HotelDetail';
import TrainDetail from './pages/TrainDetail';
import TravelcardDetail from './pages/TravelcardDetail';
import VehicleDetail from './pages/VehicleDetail';
import Logout from './pages/Logout';
import { updateBookings, updateRequested } from './reducers/bookings';
import { updateProfile, updateProfileRequested } from './reducers/profile';
import { updateScrollPosition } from './reducers/upcomingCalendar';

const App = connectedProps => (
  <div className="App">
    <Switch>
      <Route
        exact
        path="/"
        render={props => <UpcomingCalendar {...connectedProps} {...props} />}
      />
      <Route
        path="/upcoming-calendar"
        render={props => <UpcomingCalendar {...connectedProps} {...props} />}
      />
      <Route
        path="/flight-detail/:bookingID"
        render={props => <FlightDetail {...connectedProps} {...props} />}
      />
      <Route
        path="/hotel-detail/:bookingID"
        render={props => <HotelDetail {...connectedProps} {...props} />}
      />
      <Route
        path="/train-detail/:bookingID"
        render={props => <TrainDetail {...connectedProps} {...props} />}
      />
      <Route
        path="/travelcard-detail/:bookingID"
        render={props => <TravelcardDetail {...connectedProps} {...props} />}
      />
      <Route
        path="/carhire-detail/:bookingID"
        render={props => <VehicleDetail {...connectedProps} {...props} />}
      />
      <Route path="/log-out" component={Logout} />
    </Switch>
  </div>)
;

App.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  profile: PropTypes.shape({}).isRequired,
  upcomingCalendar: PropTypes.shape({}).isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  monthsWithBookings: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollPosition: PropTypes.number.isRequired,
  profileFetched: PropTypes.string.isRequired,
  updateBookings: PropTypes.func.isRequired,
  updateRequested: PropTypes.func.isRequired,
  updateScrollPosition: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  updateProfileRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bookings: state.bookings.bookings,
  profile: state.profile.profile,
  upcomingCalendar: state.upcomingCalendar,
  bookingsFetched: state.bookings.fetched,
  monthsWithBookings: state.bookings.monthsWithBookings,
  scrollPosition: state.upcomingCalendar.scrollPosition,
  profileFetched: state.profile.fetched,
});

const mapDispatchToProps =
  dispatch =>
    bindActionCreators({
      updateBookings,
      updateRequested,
      updateScrollPosition,
      updateProfile,
      updateProfileRequested,
    }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
