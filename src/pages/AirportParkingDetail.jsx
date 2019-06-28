import React from 'react';
import PropTypes from 'prop-types';
import AirportParkingDetailHeader from '../components/AirportParkingDetailHeader';
import AirportParkingInfoPanel from '../components/AirportParkingInfoPanel';
import fetchBookings from './../bookings';
import properties from '../properties.json';

const renderAirportParkingDetails =
    booking => (
      booking
        ? (
          <div>
            <AirportParkingDetailHeader
              name={booking.product.subProducts[0].details.name}
              location={booking.product.subProducts[0].details.information.find(({ title }) => title === 'Address').description}
              arrivalDate={booking.product.details.arriveDateTime}
              departureDate={booking.product.details.departDateTime}
            />
            <AirportParkingInfoPanel
              reference={booking.product.subProducts[0].reference}
              bookingId={booking.id}
              cancelAmendTerms={booking.product.subProducts[0].details.information.find(({ title }) => title === 'Cancellation Information').description}
              totalCost={booking.product.subProducts[0].details.totalEstimatedCost
                .preferred.amount}
              currency={booking.product.subProducts[0].details
                .totalEstimatedCost.preferred.currency}
              address={booking.product.subProducts[0].details.information.find(({ title }) => title === 'Address').description}
              arrivalDate={booking.product.details.arriveDateTime}
              departureDate={booking.product.details.departDateTime}
              carRegistration={booking.product.subProducts[0].bookingDetails.requirements.find(({ id }) => id === 'CAR_REGISTRATION').value}
              barCode={booking.product.subProducts[0].details.barcode}
            />
            <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in Click Travel</a>
          </div>
        )
        : <p>loading...</p>
    );

const AirportParkingDetail =
    ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
      if (bookingsFetched === 'NO') {
        updateRequested();
        fetchBookings(updateBookings);
      }
      const { bookingID } = match.params;
      const booking = bookings.find(({ id }) => id === bookingID);
      return renderAirportParkingDetails(booking);
    };

AirportParkingDetail.propTypes = {
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

export default AirportParkingDetail;
