import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VehicleDetailHeader from '../components/VehicleDetailHeader';
import VehicleInfoPanel from '../components/VehicleInfoPanel';
import fetchBookings from './../bookings';
import { updateBookings as updateBookingsFunction,
  updateRequested as updateRequestedFunction } from '../reducers/bookingsReducer';
import properties from '../properties.json';

const renderVehicleDetails =
  (booking) => {
    if (booking) {
      return (
        <div>
          <VehicleDetailHeader
            pickupLocation={booking.product.details.pickUp.location.name}
            vendor={booking.product.subProducts[0].details.vendor}
          />
          <VehicleInfoPanel
            id={booking.id}
            currency={booking.product.subProducts[0].details.totalEstimatedCost.preferred.currency}
            totalFare={booking.product.subProducts[0].details.totalEstimatedCost.preferred.amount}
            pickUp={booking.product.details.pickUp}
            dropOff={booking.product.details.dropOff}
            model={booking.product.subProducts[0].details.model}
            imageUrl={booking.product.subProducts[0].details.imageUrl}
          />
          <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in travel.cloud</a>
        </div>);
    }
    return <p>loading...</p>;
  };

const VehicleDetail =

  ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
    if (bookingsFetched === 'NO') {
      updateRequested();
      fetchBookings(updateBookings);
    }
    const { bookingID } = match.params;
    const booking = bookings.find(({ id }) => id === bookingID);
    return renderVehicleDetails(booking);
  };

VehicleDetail.propTypes = {
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

VehicleDetail.defaultProps = {
  bookingID: '0000',
  updateBookings: updateBookingsFunction,
  updateRequested: updateRequestedFunction,
};

export default connect(
  ({ bookingsReducer }) =>
    ({ bookings: bookingsReducer.bookings, bookingsFetched: bookingsReducer.fetched }),
  dispatch => bindActionCreators(
    { updateBookings: updateBookingsFunction, updateRequested: updateRequestedFunction }, dispatch),
)(VehicleDetail);
