import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

const TravelcardDetailHeader =
  ({ ticketType }) => (
    <header className="detail-header TRAVELCARD">
      <img className="detail-icon" alt="" src="/images/ct-color-travelcards.svg" />
      <div>
        <p>{ ticketType }</p>
      </div>
      <CloseButton />
    </header>
  );

TravelcardDetailHeader.propTypes = {
  ticketType: PropTypes.string.isRequired,
};

export default TravelcardDetailHeader;
