import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TrainDetailHeader from '../components/TrainDetailHeader';
import TrainInfoPanel from '../components/TrainInfoPanel';
import TrainJourneyDetailsPanel from '../components/TrainJourneyDetailsPanel';
import properties from '../properties.json';
import fetchBookings from './../bookings';

const renderTrainDetails =
  (booking) => {
    if (booking) {
      return (
        <div>
          <TrainDetailHeader
            departureStation={booking.product.subProducts[0].details.fares[0].origin.name}
            arrivalStation={booking.product.subProducts[0].details.fares[0].destination.name}
            isReturnJourney={booking.product.details.journeys.length > 1}
            departTime={moment(booking.product.details.journeys[0].legs[0].depart.dateTime)
              .format('HH:mm')}
          />
          { booking.product.details.journeys.map(x => (
            <TrainJourneyDetailsPanel
              key={x.id}
              journey={x}
              routeRestriction={booking.product.subProducts[0].details.fares[0].fareRoute.name}
            />
          ))}
          <TrainInfoPanel
            id={booking.id}
            ctrReference={booking.product.subProducts[0].details.ctrReference}
            journeys={booking.product.details.journeys}
            currency={booking.product.subProducts[0].details.totalEstimatedCost.preferred.currency}
            totalFare={booking.product.subProducts[0].details.totalEstimatedCost.preferred.amount}
            routeRestriction={booking.product.subProducts[0].details.fares[0].fareRoute.name}
          />
          <a href={`${properties.travelcloudUrl}Travel.html#/bookings/${booking.id}`} className="external-link">View this booking in Click Travel</a>
        </div>);
    }
    return <p>loading...</p>;
  };

const TrainDetail =
  ({ match, bookings, updateBookings, bookingsFetched, updateRequested }) => {
    if (bookingsFetched === 'NO') {
      updateRequested();
      fetchBookings(updateBookings);
    }
    const { bookingID } = match.params;
    const booking = bookings.find(({ id }) => id === bookingID);
    return renderTrainDetails(booking);
  };

TrainDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      bookingID: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  bookings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateBookings: PropTypes.func.isRequired,
  bookingsFetched: PropTypes.string.isRequired,
  updateRequested: PropTypes.func.isRequired,
};

export default TrainDetail;
