import React from 'react';
import PropTypes from 'prop-types';
// TODO: Remove explicit dependency on moment
import moment from 'moment';

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

CardDetails.propTypes = {
  travelType: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default CardDetails;
