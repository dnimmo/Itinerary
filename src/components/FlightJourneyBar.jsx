import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';

const FlightJourneyBar =
  ({ flight }) => (
    <div className="journey-bar-component">
      <p className="journey-date">
        {`${moment(flight.segments[0].depart.dateTime).format('D')} / ${moment(flight.segments[0].depart.dateTime).format('ddd')}  `}
      </p>
      <span className="segments">{ flight.segments.map((x, i) => (
        <span key={shortid.generate()} className={`journey-item _${x.operatingAirline.code}`}>
          {i > 0 ? <span className="journey-stop journey-bar" > &gt; </span> : <span />}
          <span className="journey-bar">{x.operatingAirline.name}</span>
        </span>
      ))}
      </span>
    </div>
  );

FlightJourneyBar.propTypes = {
  flight: PropTypes.shape({
    segments: PropTypes.array, // TODO: Consider making more specific
  }).isRequired,
};

export default FlightJourneyBar;
