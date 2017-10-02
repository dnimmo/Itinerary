import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';
import JourneySegment from './JourneySegment';

const JourneyBar =
  ({ segments }) => (
    <div className="journey-bar-component">
      <p className="journey-date">
        {`${moment(segments[0].depart.dateTime).format('D')} / ${moment(segments[0].depart.dateTime).format('ddd')}  `}
      </p>
      <div className="segments">{ segments.map((x, i) => [
        i > 0 ? <div className="journey-stop journey-bar" > &gt; </div> : null,
        <div key={shortid.generate()} className="journey-item">
          <JourneySegment
            startTime={x.depart.dateTime}
            endTime={x.arrive.dateTime}
            providerName={x.serviceProvider.name}
            providerCode={x.serviceProvider.code}
          />
        </div>,
      ])}
      </div>
    </div>
  );

JourneyBar.propTypes = {
  segments: PropTypes.arrayOf.isRequired,
};

export default JourneyBar;
