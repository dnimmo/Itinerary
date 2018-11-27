import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import InfoItem from './InfoItem';

const getPickUp =
  pickUp => `${moment.utc(pickUp.dateTime).format('HH:mm')} on ${moment.utc(pickUp.dateTime).format('DD/MM/YYYY')}`;

const getDropOff =
  dropOff => `${moment.utc(dropOff.dateTime).format('HH:mm')} on ${moment.utc(dropOff.dateTime).format('DD/MM/YYYY')}`;

const VehicleInfoPanel =
  ({ id, currency, totalFare, pickUp, dropOff, model, imageUrl }) => (
    <div className="info-panel">
      <InfoItem label="Car Type" displayText={model} imageUrl={imageUrl} />
      <InfoItem
        label="Pick-Up"
        displayText={getPickUp(pickUp)}
      />
      <InfoItem
        label="Pick-Up Location"
        displayText={pickUp.location.name}
      />
      <InfoItem
        label="Drop Off"
        displayText={getDropOff(dropOff)}
      />
      <InfoItem
        label="Drop Off Location"
        displayText={dropOff.location.name}
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

VehicleInfoPanel.propTypes = {
  id: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalFare: PropTypes.string.isRequired,
  pickUp: PropTypes.shape({}).isRequired,
  dropOff: PropTypes.shape({}).isRequired,
  model: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VehicleInfoPanel;
