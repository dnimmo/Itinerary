import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toolbar from '../components/Toolbar';
import Cards from '../components/Cards';
import { updateBookings as updateBookingsFunction,
  updateRequested as updateRequestedFunction } from '../reducers/bookingsReducer';
import {
  updateScrollPosition as updateScrollPositionFunction } from '../reducers/upcomingCalendarReducer';
import { updateProfile as updateProfileFunction,
  updateProfileRequested as updateProfileRequestedFunction } from '../reducers/profileReducer';
import fetchBookings from '../bookings';
import { fetchProfile } from '../profile';
import { clearTokens, checkForValidToken } from '../auth';

const CardPanel =
  ({ bookings, refreshing }) => {
    if (bookings.length) {
      return <Cards bookings={bookings} />;
    } else if (refreshing) {
      return null;
    }
    return (
      <div className="no-bookings-panel">
        <p>You don&#39;t have any travel booked</p>
        <p className="detail">Once you book some travel on <a href="https://apps.travel.cloud">travel.cloud</a> your itinerary will appear here.</p>
      </div>
    );
  };

const RefreshingPanel =
  ({ refreshing }) => {
    if (refreshing) {
      return <div className="refreshing-panel">Refreshing</div>;
    }
    return null;
  };

const UpcomingCalendar =
  ({
    bookings,
    bookingsFetched,
    monthsWithBookings,
    updateBookings,
    profile,
    profileFetched,
    updateProfile,
    updateRequested,
    updateProfileRequested,
  }) => {
    if (bookingsFetched === 'NO') {
      updateRequested();
      fetchBookings(updateBookings);
    }

    if (profileFetched === 'NO') {
      updateProfileRequested();
      fetchProfile(updateProfile);
    }
    const updatePosition =
        () => {
          // const node = document.querySelector('.upcoming-calendar');
          // const nodeHeight = node.scrollHeight;
          // const newPosition = node.scrollTop + node.clientHeight;
          // const hasDecreased = (newPosition / nodeHeight) * 100 < scrollPosition;
          // const position = newPosition;
          // console.log(hasDecreased);
          // updateScrollPosition({ nodeHeight, position });
        };

    const refreshAllBookings = () => {
      if (navigator.onLine) {
        if ('serviceWorker' in navigator) {
          window.caches.delete('Ivysaur-dynamic');
        }
        if (!checkForValidToken()) {
          clearTokens();
          window.location.reload();
        } else {
          updateRequested();
          fetchBookings(updateBookings);
        }
      }
    };


    return (
      bookings
        ? (
          <div className="upcoming-calendar" onScroll={updatePosition}>
            <Toolbar profile={profile} refreshBookings={refreshAllBookings} monthsWithBookings={monthsWithBookings} loading={bookingsFetched === 'REQUESTED'} />
            <RefreshingPanel refreshing={bookingsFetched === 'REQUESTED'} />
            <CardPanel bookings={bookings} refreshing={bookingsFetched === 'REQUESTED'} />
            <div className="anchor" />
          </div>
        )
        : <p>loading...</p>
    );
  };

RefreshingPanel.propTypes = {
  refreshing: PropTypes.bool.isRequired,
};

CardPanel.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  refreshing: PropTypes.bool.isRequired,
};

UpcomingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  monthsWithBookings: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateBookings: PropTypes.func,
  updateProfile: PropTypes.func,
  profile: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  profileFetched: PropTypes.string.isRequired,
  updateRequested: PropTypes.func,
  updateProfileRequested: PropTypes.func,
};

UpcomingCalendar.defaultProps = {
  updateBookings: updateBookingsFunction,
  updateProfile: updateProfileFunction,
  updateScrollPosition: updateScrollPositionFunction,
  updateRequested: updateRequestedFunction,
  updateProfileRequested: updateProfileRequestedFunction,
};

export default connect(
  ({ bookingsReducer, upcomingCalendarReducer, profileReducer }) => ({
    bookings: bookingsReducer.bookings,
    monthsWithBookings: bookingsReducer.monthsWithBookings,
    scrollPosition: upcomingCalendarReducer.scrollPosition,
    profile: profileReducer.profile,
    bookingsFetched: bookingsReducer.fetched,
    profileFetched: profileReducer.fetched,
  }),
  dispatch => bindActionCreators({ updateBookings: updateBookingsFunction,
    updateScrollPosition: updateScrollPositionFunction,
    updateProfile: updateProfileFunction,
    updateRequested: updateRequestedFunction,
    updateProfileRequested: updateProfileRequestedFunction,
  }, dispatch),
)(UpcomingCalendar);
