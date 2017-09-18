import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

const VehicleDetailHeader =
  ({ pickupLocation, vendor }) => (
    <header className="detail-header VEHICLE">
      <img className="detail-icon" alt="" src="/images/ct-color-carhire.svg" />
      <div>
        <p>{ vendor }</p>
        <p className="separator" />
        <p>{ pickupLocation }</p>
      </div>
      <CloseButton />
    </header>
  );

VehicleDetailHeader.propTypes = {
  pickupLocation: PropTypes.string.isRequired,
  vendor: PropTypes.string.isRequired,
};

export default VehicleDetailHeader;
