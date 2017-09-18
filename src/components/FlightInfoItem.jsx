import React from 'react';
import PropTypes from 'prop-types';

const FlightInfoItem =
  ({ label, displayText }) => (
    <div className="info-item">
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>
  );

FlightInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

export default FlightInfoItem;
