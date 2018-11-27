import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

const FlightDetailHeader =
  ({ departureAirport, arrivalAirport, airline }) => (
    <header className="detail-header FLIGHT">
      <img className="detail-icon" alt="" src="/images/st-color-flights.svg" />
      <div>
        <p>{ departureAirport }</p>
        <p className="separator">To</p>
        <p>{ arrivalAirport }</p>
        <p className="secondary-info">{ airline }</p>
      </div>
      <CloseButton />
    </header>
  );

FlightDetailHeader.propTypes = {
  departureAirport: PropTypes.string.isRequired,
  arrivalAirport: PropTypes.string.isRequired,
  airline: PropTypes.string.isRequired,
};

export default FlightDetailHeader;
