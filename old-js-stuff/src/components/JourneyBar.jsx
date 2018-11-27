import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';
import JourneySegment from './JourneySegment';
import { hasExpired } from '../utilities/bookings_utility';

const getProviderName =
  (journeyType, segment) => {
    switch (journeyType) {
      case 'flight':
        return segment.operatingAirline.name;
      case 'train':
        return segment.serviceProvider.name;
      default:
        return 'unknown';
    }
  };

const getProviderCode =
  (journeyType, segment) => {
    switch (journeyType) {
      case 'flight':
        return segment.operatingAirline.code;
      case 'train':
        return segment.serviceProvider.code;
      default:
        return 'unknown';
    }
  };

const JourneyBar =
  ({ segments, journeyType }) => {
    const expiredLeg = hasExpired(segments[0].depart.dateTime);
    return (
      !expiredLeg
        ? <div className="journey-bar-component">
          <p className="journey-date">
            {`${moment(segments[0].depart.dateTime).format('D')} / ${moment(segments[0].depart.dateTime).format('ddd')}  `}
          </p>
          <div className="segments">{ segments.map((x, i) => [
            i > 0 ? <div className="journey-stop journey-bar" > &gt; </div> : null,
            <div key={shortid.generate()} className="journey-item">
              <JourneySegment
                startTime={x.depart.dateTime}
                endTime={x.arrive.dateTime}
                providerName={getProviderName(journeyType, x)}
                providerCode={getProviderCode(journeyType, x)}
              />
            </div>,
          ])}
          </div>
        </div>
        : null
    );
  };

JourneyBar.propTypes = {
  segments: PropTypes.arrayOf.isRequired,
  journeyType: PropTypes.string.isRequired,
};

export default JourneyBar;
