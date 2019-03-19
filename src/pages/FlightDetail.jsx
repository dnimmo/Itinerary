import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import FlightDetailHeader from '../components/FlightDetailHeader';
import FlightInfoPanel from '../components/FlightInfoPanel';
import FlightJourneyDetailsPanel from '../components/FlightJourneyDetailsPanel';
import fetchBookings from './../bookings';
import { getFlightType, FLIGHT_TYPE } from '../utilities/bookings_utility';
import properties from '../properties.json';

const finalArrival = segments => (segments[segments.length - 1].arrive.location.name);

const arrivalFlight = ({ flights }, type) => {
  switch (type) {
    case FLIGHT_TYPE.MULTI_CITY:
      return flights[flights.length - 1];
    default:
      return flights[0];
  }
};

const renderFlightDetails =
  booking => (
    booking
      ? (
        <div>
          <FlightDetailHeader
            departureAirport={booking.product.details.flights[0].segments[0].depart.location.name.split(',')[1]}
            arrivalAirport={
              finalArrival(arrivalFlight(booking.product.details, getFlightType(booking)).segments).split(',')[1]
            }
            airline={booking.product.details.codeshareCarrier.name}
            tripType={getFlightType(booking)}
          />
          { booking.product.details.flights.map(x => (
            <FlightJourneyDetailsPanel
              key={shortid.generate()}
              flight={x}
              baggageAllowance={booking.product.subProducts[0].details.baggageAllowance}
            />
          ))}
          <FlightInfoPanel
            reference={booking.product.subProducts[0].reference}
            bookingId={booking.id}
            currency={booking.product.subProducts[0].details.totalEstimatedCost.billing.currency}
            totalFare={booking.product.subProducts[0].details.totalEstimatedCost.billing.amount}
          />
          <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in clicktravel.com</a>
        </div>
      )
      : <p>loading...</p>
  );

const FlightDetail =
  ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
    if (bookingsFetched === 'NO') {
      updateRequested();
      fetchBookings(updateBookings);
    }
    const { bookingID } = match.params;
    const booking = bookings.find(({ id }) => id === bookingID);
    return renderFlightDetails(booking);
  };

FlightDetail.propTypes = {
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

export default FlightDetail;
