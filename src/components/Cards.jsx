import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from './Card';
import { bookingsToCards, hasExpired } from '../utilities/bookings_utility';

const CardLink =
  (travelType) => {
    switch (travelType) {
      case 'HOTEL':
        return 'hotel-detail';
      case 'FLIGHT':
        return 'flight-detail';
      case 'TRAIN':
        return 'train-detail';
      case 'TRAVELCARD':
        return 'travelcard-detail';
      case 'VEHICLE':
        return 'carhire-detail';
      case 'AIRPORT_PARKING':
        return 'airport-parking-detail';
      default:
        return '';
    }
  };

const CardImage =
  (travelType) => {
    switch (travelType) {
      case 'HOTEL':
        return 'images/ct-color-hotels.svg';
      case 'FLIGHT':
        return 'images/st-color-flights.svg';
      case 'TRAIN':
        return 'images/ct-color-trains.svg';
      case 'TRAVELCARD':
        return 'images/ct-color-travelcards.svg';
      case 'VEHICLE':
        return 'images/ct-color-carhire.svg';
      case 'AIRPORT_PARKING':
        return 'images/ct-color-parking.svg';
      default:
        return '';
    }
  };

const CardComponents =
  cards => cards.map(({ label, data }) => (
    <div key={label}>
      <div className={`month-panel ${label.split(' ')[0]}`}>
        <p id={label.replace(' ', '')}>{label}</p>
      </div>
      {data
        .filter(({ date }) => !hasExpired(date))
        .map(x => (
          <Card
            key={x.unique}
            travelType={x.travelType}
            dayNumber={x.dayNumber}
            day={moment(x.date).format('ddd')}
            data={x}
            link={CardLink(x.travelType)}
            imageFile={CardImage(x.travelType)}
            id={x.id}
            firstBookingOfDay={x.id === data.find(({ dayNumber }) => dayNumber === x.dayNumber).id}
          />
        ))}
    </div>
  ));

const Cards =
({ bookings }) => {
  const cards =
    bookings
      ? bookingsToCards(bookings)
      : [{}];
  return (
    cards.length
      ? <div>{CardComponents(cards)}</div>
      : null
  );
};

Cards.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    data: PropTypes.array, // TODO: Consider more specification
  })).isRequired,
};

export default Cards;
