import React from 'react';
import PropTypes from 'prop-types';

const VehicleInfoItem =
  ({ label, displayText }) => (
    <div className="info-item">
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>
  );

VehicleInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

export default VehicleInfoItem;
