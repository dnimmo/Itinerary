import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CloseButton from './CloseButton';

const AirportParkingDetailHeader =
    ({ name, location, arrivalDate, departureDate }) => (
      <header className="detail-header AIRPORT_PARKING">
        <img className="detail-icon" alt="" src="/images/ct-color-parking.svg" />
        <div>
          <p>{ name }</p>
          <p>{ location }</p>
          <p>{ moment(arrivalDate).format('D MMM') } - { moment(departureDate).format('D MMM')}</p>
        </div>
        <CloseButton />
      </header>
    );

AirportParkingDetailHeader.propTypes = {
  name: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default AirportParkingDetailHeader;
