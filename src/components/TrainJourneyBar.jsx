import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const TrainJourneyBar =
  ({ journey }) => (
    <div className="journey-bar-component">
      <p className="journey-date">
        {`${moment(journey.legs[0].depart.dateTime).format('D')} / ${moment(journey.legs[0].depart.dateTime).format('ddd')}`}
      </p>
      <span className="segments">{
        journey.legs.map((x, i) => (
          <span key={x.id} className="journey-item">
            {i > 0 ? <span className="journey-stop journey-bar" > &gt; </span> : <span />}
            <span className={`journey-bar _${x.serviceProvider.code}`}>{x.serviceProvider.name}</span>
          </span>
        ))}
      </span>
    </div>
  );

TrainJourneyBar.propTypes = {
  journey: PropTypes.shape({}).isRequired,
};

export default TrainJourneyBar;
