import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CloseButton from './CloseButton';

const HotelDetailHeader =
    ({ propertyName, location, checkInDate, checkOutDate }) => (
      <header className="detail-header HOTEL">
        <img className="detail-icon" alt="" src="/images/ct-color-hotels.svg" />
        <div>
          <p>{ propertyName }</p>
          <p>{ location }</p>
          <p>{ moment(checkInDate).format('D MMM') } - { moment(checkOutDate).format('D MMM')}</p>
        </div>
        <CloseButton />
      </header>
    );

HotelDetailHeader.propTypes = {
  propertyName: PropTypes.string.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default HotelDetailHeader;
