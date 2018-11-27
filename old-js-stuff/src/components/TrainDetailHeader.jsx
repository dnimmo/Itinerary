import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

const TrainDetailHeader =
  ({ departureStation, arrivalStation, departTime, isReturnJourney }) => (
    <header className="detail-header TRAIN">
      <img className="detail-icon" alt="" src="/images/ct-color-trains.svg" />
      <div>
        <p>{ departureStation }</p>
        <p className="separator">To</p>
        <p>{ arrivalStation } { isReturnJourney ? '(Return)' : ''}</p>
        <p className="secondary-info dark">{ departTime }</p>
      </div>
      <CloseButton />
    </header>
  );

TrainDetailHeader.propTypes = {
  departureStation: PropTypes.string.isRequired,
  arrivalStation: PropTypes.string.isRequired,
  departTime: PropTypes.string.isRequired,
  isReturnJourney: PropTypes.bool.isRequired,
};

export default TrainDetailHeader;
