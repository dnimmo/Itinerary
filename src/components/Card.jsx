import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const CardDetails =
({
  travelType,
  data,
}) => {
  switch (travelType) {
    case 'HOTEL':
      return (
        <div className="booking-text">
          <p> { data.propertyName } </p>
          <p className="secondary-info"> { data.address } </p>
        </div>
      );
    case 'FLIGHT':
      return (
        <div className="booking-text">
          <p> { moment(data.date).format('HH:mm')}  { data.depart.split(',')[1] } to { data.arrive.split(',')[1] }</p>
          <p className="secondary-info"> { (`${data.vendor}`)} </p>
        </div>
      );
    case 'TRAIN':
      return (
        <div className="booking-text">
          <p> { moment(data.date).format('HH:mm') } { data.depart } to { data.arrive } </p>
          <p className="secondary-info dark"> { data.ticketType }  </p>
        </div>
      );
    case 'TRAVELCARD':
      return (
        <div className="booking-text">
          <p> { data.name } </p>
        </div>
      );
    case 'VEHICLE':
      return (
        <div className="booking-text">
          <p> {moment(data.date).utc().format('HH:mm')} { data.action === 'PICK-UP' ? `Pick Up ${data.pickUpLocation}` : `Drop Off ${data.dropOffLocation}`} </p>
          <p className="secondary-info dark"> { data.rentalCompanyName } </p>
        </div>
      );
    default:
      return <span />;
  }
};

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
  key,
  firstBookingOfDay,
}) => {
  const className = `booking-card ${travelType}`;
  return (<div className={firstBookingOfDay ? 'booking-card-panel first' : 'booking-card-panel'}>
    <div className="booking-date">
      <p> {firstBookingOfDay ? dayNumber : ''}</p>
      <p className="booking-day"> {firstBookingOfDay ? day : ''} </p>
    </div>
    <div className={className}>
      <Link
        onClick={resetPosition}
        className="link booking-details"
        key={key}
        to={`/${link}/${id}`}
      >
        <img src={imageFile} alt="" />
        {CardDetails({ travelType, data })}
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
  key: PropTypes.string,
};

CardDetails.propTypes = {
  travelType: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

Card.defaultProps = {
  key: shortid.generate(),
};

export default connect(
  ({ bookingsReducer }) => ({ bookings: bookingsReducer.bookings }),
)(Card);
