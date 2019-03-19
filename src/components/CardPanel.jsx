import React from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

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
        <p className="detail">Once you book some travel on <a href="https://my.clicktravel.com">clicktravel.com</a> your itinerary will appear here.</p>
      </div>
    );
  };

CardPanel.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  refreshing: PropTypes.bool.isRequired,
};

export default CardPanel;
