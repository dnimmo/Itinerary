import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const JourneySegment =
({ startTime, endTime, providerName, providerCode }) => (
  <div>
    <div className={`journey-bar _${providerCode}`}>
      {providerName}
      <br />
      {`${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`}
    </div>
  </div>
);

JourneySegment.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  providerCode: PropTypes.string.isRequired,
};

export default JourneySegment;
