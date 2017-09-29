import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import InfoItem from './InfoItem';

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
