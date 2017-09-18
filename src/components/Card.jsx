import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';


const CardTime =
  ({
    travelType,
    date,
  }) => {
    switch (travelType) {
      case 'HOTEL':
        return <p className="booking-time" />;
      case 'FLIGHT':
        return <p className="booking-time">{moment(date).format('HH:mm')} </p>;
      case 'TRAIN':
        return <p className="booking-time">{moment(date).format('HH:mm')} </p>;
      case 'TRAVELCARD':
        return <p className="booking-time" />;
      case 'VEHICLE':
        return <p className="booking-time">{moment(date).utc().format('HH:mm')} </p>;
      default:
        return <p />;
    }
  };

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
          <p> { data.depart.split(',')[1] } </p>
          <p> { data.arrive.split(',')[1] } </p>
          <p className="secondary-info"> { (`${data.vendor}`)} </p>
        </div>
      );
    case 'TRAIN':
      return (
        <div className="booking-text">
          <p> { data.depart } </p>
          <p> { data.arrive }  </p>
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
          <p> { data.pickUpLocation } </p>
          <p className="secondary-info dark"> { data.rentalCompanyName } </p>
          <p className="secondary-info dark"> { data.model } </p>
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
}) => {
  const className = `booking-card ${travelType}`;
  return (<div className="booking-card-panel">
    <div className="booking-date">
      <p> {dayNumber} </p>
      <p className="booking-day"> {day} </p>
      <CardTime travelType={travelType} date={data.date} />
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

CardTime.propTypes = {
  travelType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

Card.propTypes = {
  travelType: PropTypes.string.isRequired,
  dayNumber: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  link: PropTypes.string.isRequired,
  imageFile: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
