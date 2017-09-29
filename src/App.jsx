import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { lifecycle } from 'recompose';
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
import fetchBookings from './bookings';

const App = (connectedProps) => {
  console.log('rendered');
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={props => <UpcomingCalendar {...props} {...connectedProps} />}
        />
        <Route
          path="/upcoming-calendar"
          render={props => <UpcomingCalendar {...props} {...connectedProps} />}
        />
        <Route path="/flight-detail/:bookingID" component={FlightDetail} />
        <Route path="/hotel-detail/:bookingID" component={HotelDetail} />
        <Route
          path="/train-detail/:bookingID"
          render={props => <TrainDetail {...props} {...connectedProps} />}
        />
        <Route
          path="/travelcard-detail/:bookingID"
          render={props => <TravelcardDetail {...props} {...connectedProps} />}
        />
        <Route
          path="/carhire-detail/:bookingID"
          render={props => <VehicleDetail {...props} {...connectedProps} />}
        />
        <Route path="/log-out" component={Logout} />
      </Switch>
    </div>);
};

App.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  profile: PropTypes.shape({}).isRequired,
  upcomingCalendar: PropTypes.shape({}).isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  monthsWithBookings: PropTypes.arrayOf().isRequired,
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

const lifecycleMethods = {
  componentDidMount() {
    fetchBookings(this.props.updateBookings);
  },
};

const AppWithLifecycleMethods = lifecycle(lifecycleMethods)(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithLifecycleMethods);
