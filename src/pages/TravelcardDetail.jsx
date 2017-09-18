import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import TravelcardDetailHeader from '../components/TravelcardDetailHeader';
import TravelcardInfoPanel from '../components/TravelcardInfoPanel';
import fetchBookings from './../bookings';
import { updateBookings as updateBookingsFunction,
  updateRequested as updateRequestedFunction } from '../reducers/bookingsReducer';
import properties from '../properties.json';

const renderTravelcardDetails =
  (booking) => {
    if (booking) {
      return (<div>
        <TravelcardDetailHeader
          ticketType={booking.product.subProducts[0].details.name}
        />
        <TravelcardInfoPanel
          id={booking.id}
          ctrReference={booking.product.subProducts[0].details.ctrReference}
          currency={booking.product.subProducts[0].details.totalEstimatedCost.preferred.currency}
          totalFare={booking.product.subProducts[0].details.totalEstimatedCost.preferred.amount}
        />
        <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in travel.cloud</a>
      </div>);
    }
    return <p>loading...</p>;
  };

const TravelcardDetail =
  ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
    if (bookingsFetched === 'NO') {
      updateRequested();
      fetchBookings(updateBookings);
    }
    const { bookingID } = match.params;
    const booking = bookings.find(({ id }) => id === bookingID);
    return renderTravelcardDetails(booking);
  };

TravelcardDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      bookingID: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateBookings: PropTypes.func,
  bookingsFetched: PropTypes.string.isRequired,
  updateRequested: PropTypes.func,
};

TravelcardDetail.defaultProps = {
  bookingID: '0000',
  updateBookings: updateBookingsFunction,
  updateRequested: updateRequestedFunction,
};

export default connect(
  ({ bookingsReducer }) =>
    ({ bookings: bookingsReducer.bookings, bookingsFetched: bookingsReducer.fetched }),
  dispatch => bindActionCreators(
    { updateBookings: updateBookingsFunction, updateRequested: updateRequestedFunction }, dispatch),
)(TravelcardDetail);
