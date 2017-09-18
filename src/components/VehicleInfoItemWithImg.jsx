import React from 'react';
import PropTypes from 'prop-types';

const VehicleInfoItemWithImg =
  ({ label, displayText, imageUrl }) => (
    <div className="info-item-full-width">
      <img className="detail-icon" alt="" src={imageUrl} />
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>
  );

VehicleInfoItemWithImg.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VehicleInfoItemWithImg;
