import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardDetails from './CardDetails';

const resetPosition =
  () => {
    window.scrollTo(0, 0);
  };

const Card =
({
  travelType,
  dayNumber,
  day,
  data,
  link,
  imageFile,
  id,
  firstBookingOfDay,
}) => {
  const className = `booking-card ${travelType}`;
  return (
    <div className={firstBookingOfDay ? 'booking-card-panel first' : 'booking-card-panel'}>
      <div className="booking-date">
        <p> {firstBookingOfDay ? dayNumber : ''}</p>
        <p className="booking-day"> {firstBookingOfDay ? day : ''} </p>
      </div>
      <div className={className}>
        <Link
          onClick={resetPosition}
          className="link booking-details"
          to={`/${link}/${id}`}
        >
          <img src={imageFile} alt="" />
          <CardDetails travelType={travelType} data={data} />
        </Link>
      </div>
    </div>);
};

Card.propTypes = {
  travelType: PropTypes.string.isRequired,
  dayNumber: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  link: PropTypes.string.isRequired,
  imageFile: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  firstBookingOfDay: PropTypes.bool.isRequired,
};

export default Card;
