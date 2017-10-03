import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../components/Toolbar';
import CardPanel from '../components/CardPanel';
import RefreshingPanel from '../components/RefreshingPanel';
import fetchBookings from '../bookings';
import { fetchProfile } from '../profile';
import { clearTokens, checkForValidToken } from '../auth';

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

    const refreshAllBookings = () => {
      if (navigator.onLine) {
        if ('serviceWorker' in navigator) {
          window.caches.delete('Charmander-dynamic');
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
          <div className="upcoming-calendar">
            <Toolbar
              profile={profile}
              refreshBookings={refreshAllBookings}
              monthsWithBookings={monthsWithBookings}
              loading={bookingsFetched === 'REQUESTED'}
            />
            <RefreshingPanel refreshing={bookingsFetched === 'REQUESTED'} />
            <CardPanel bookings={bookings} refreshing={bookingsFetched === 'REQUESTED'} />
            <div className="anchor" />
          </div>
        )
        : <p>loading...</p>
    );
  };

UpcomingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  monthsWithBookings: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateBookings: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  profileFetched: PropTypes.string.isRequired,
  updateRequested: PropTypes.func.isRequired,
  updateProfileRequested: PropTypes.func.isRequired,
};

export default UpcomingCalendar;
