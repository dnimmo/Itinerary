import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import HotelDetailHeader from '../components/HotelDetailHeader';
import HotelInfoPanel from '../components/HotelInfoPanel';
import fetchBookings from './../bookings';
import { updateBookings as updateBookingsFunction,
  updateRequested as updateRequestedFunction } from '../reducers/bookingsReducer';
import properties from '../properties.json';

const renderHotelDetails =
    booking => (
      booking
        ? (
          <div>
            <HotelDetailHeader
              propertyName={booking.product.details.propertyName}
              location={booking.product.details.address[0]}
              checkInDate={booking.product.details.checkInDate}
              checkOutDate={booking.product.details.checkOutDate}
            />
            <HotelInfoPanel
              reference={booking.product.subProducts[0].reference}
              bookingId={booking.id}
              cancelAmendTerms={booking.product.subProducts[0].details.cancelAmendTerms}
              roomRate={booking.product.subProducts[0].details.roomRate.preferred.amount}
              totalRoomRate={booking.product.subProducts[0].details.totalEstimatedCost
                .preferred.amount}
              currency={booking.product.subProducts[0].details
                .totalEstimatedCost.preferred.currency}
              address={booking.product.details.address}
              profileImageUrl={booking.product.details.profileImage}
              phone={booking.product.details.telephone}
              email={booking.product.details.emailAddress}
              roomType={booking.product.subProducts[0].details.roomType}
              additions={booking.product.subProducts[0].details.additions}
              selectedAdditions={booking.product.subProducts[0].bookingDetails.additions}
            />
            <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in travel.cloud</a>
          </div>
        )
        : <p>loading...</p>
    );

const HotelDetail =
    ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
      if (bookingsFetched === 'NO') {
        updateRequested();
        fetchBookings(updateBookings);
      }
      const { bookingID } = match.params;
      const booking = bookings.find(({ id }) => id === bookingID);
      return renderHotelDetails(booking);
    };

HotelDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      bookingID: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  updateBookings: PropTypes.func,
  updateRequested: PropTypes.func,
};

HotelDetail.defaultProps = {
  bookingID: '0000',
  updateBookings: updateBookingsFunction,
  updateRequested: updateRequestedFunction,
};

export default connect(
  ({ bookingsReducer }) =>
    ({ bookings: bookingsReducer.bookings, bookingsFetched: bookingsReducer.fetched }),
  dispatch => bindActionCreators(
    { updateBookings: updateBookingsFunction, updateRequested: updateRequestedFunction }, dispatch),
)(HotelDetail);
