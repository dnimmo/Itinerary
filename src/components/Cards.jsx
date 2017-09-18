import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from './Card';
import { bookingsToCards } from '../utilities/bookings__utility';

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
    default:
      return '';
  }
};

const CardComponents =
cards => (
  cards.map(({ label, data }) => (
    <div key={label}>
      <div className={`month-panel ${label.split(' ')[0]}`}>
        <p id={label.replace(' ', '')}>{label}</p>
      </div>
      {data.map(x => (
        <Card
          key={x.unique}
          travelType={x.travelType}
          dayNumber={moment(x.date).format('Do')}
          day={moment(x.date).format('ddd')}
          data={x}
          link={CardLink(x.travelType)}
          imageFile={CardImage(x.travelType)}
          id={x.id}
        />
      ))}
    </div>
  ))
);

const Cards =
({ bookings }) => {
  const cards = bookings ? bookingsToCards(bookings) : [{}];
  return (
    cards.length
      ? <div>{CardComponents(cards)}</div>
      : <span />
  );
};

Cards.propTypes = {
  bookings: PropTypes.arrayOf({
    label: PropTypes.string,
    data: PropTypes.array, // TODO: Consider more specification
  }).isRequired,
};

export default Cards;
