import React from 'react';
import PropTypes from 'prop-types';

import currencyFormatter from 'currency-formatter';

const InfoItem =
  ({ label, displayText, emphasise }) => (
    <div className="info-item">
      <p className="label">{label}</p>
      <p className={emphasise ? 'info-emphasis' : ''}>{displayText}</p>
    </div>
  );

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
  emphasise: PropTypes.bool,
};

InfoItem.defaultProps = {
  emphasise: false,
};

const FlightInfoPanel =
  ({
    reference,
    bookingId,
    currency,
    totalFare,
  }) => (
    <div className="info-panel">
      <InfoItem
        label="Booking Reference"
        displayText={reference}
        emphasise
      />
      <InfoItem
        label="Booking ID"
        displayText={bookingId}
      />
      <InfoItem
        label="Total Fare"
        displayText={currencyFormatter.format(totalFare, { code: currency })}
      />
    </div>
  );

FlightInfoPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalFare: PropTypes.string.isRequired,
};

export default FlightInfoPanel;
