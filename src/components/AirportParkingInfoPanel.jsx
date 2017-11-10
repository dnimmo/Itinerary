import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import CollapsibleInfo from './CollapsibleInfo';
import InfoItem from './InfoItem';
import ImageItem from './ImageItem';

const AirportParkingInfoPanel =
    ({
      reference,
      bookingId,
      cancelAmendTerms,
      address,
      arrivalDate,
      departureDate,
      currency,
      totalCost,
      carRegistration,
      barCode,
    }) => (
      <div className="info-panel">
        <InfoItem
          label="Address"
          displayText={address}
          fullWidth
        />
        <InfoItem
          label="Arrival"
          displayText={moment(arrivalDate).format('D MMM YYYY hh:mm')}
        />
        <InfoItem
          label="Departure"
          displayText={moment(departureDate).format('D MMM YYYY hh:mm')}
        />
        <InfoItem
          label="Reference"
          displayText={reference}
        />
        <InfoItem
          label="Booking ID"
          displayText={bookingId}
        />
        <InfoItem
          label="Total Rate"
          displayText={currencyFormatter.format(totalCost, { code: currency })}
        />
        <InfoItem
          label="Car Registration"
          displayText={carRegistration}
        />
        <CollapsibleInfo
          title="Cancellation policy"
          info={cancelAmendTerms}
        />
        <ImageItem label="Barcode" imageBase64={barCode} />
      </div>
    );

AirportParkingInfoPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  cancelAmendTerms: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  totalCost: PropTypes.string.isRequired,
  barCode: PropTypes.string,
  currency: PropTypes.string.isRequired,
  carRegistration: PropTypes.string,
};

AirportParkingInfoPanel.defaultProps = {
  email: 'Not recorded',
  phone: 'Not recorded',
};

export default AirportParkingInfoPanel;
