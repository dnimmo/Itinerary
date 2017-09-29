import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import InfoItem from './InfoItem';

const TravelcardInfoPanel =
  ({ id, ctrReference, currency, totalFare }) => (
    <div className="info-panel">
      <InfoItem
        label="Ticket Collection Ref"
        displayText={ctrReference}
        emphasise
      />
      <InfoItem
        label="Booking ID"
        displayText={id}
      />
      <InfoItem
        label="Total Fare"
        displayText={currencyFormatter.format(totalFare, { code: currency })}
      />
    </div>
  );

TravelcardInfoPanel.propTypes = {
  id: PropTypes.string.isRequired,
  ctrReference: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalFare: PropTypes.string.isRequired,
};

export default TravelcardInfoPanel;
