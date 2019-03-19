import React from 'react';
import PropTypes from 'prop-types';
import HotelDetailHeader from '../components/HotelDetailHeader';
import HotelInfoPanel from '../components/HotelInfoPanel';
import fetchBookings from './../bookings';
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
            <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in clicktravel.com</a>
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

export default HotelDetail;
