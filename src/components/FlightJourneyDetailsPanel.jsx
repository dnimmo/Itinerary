import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import JourneyBar from './JourneyBar';
import JourneyDetails from './FlightJourneyDetails';

const FlightJourneyDetailsPanel =
  ({ flight, baggageAllowance }) => (
    <Collapsible
      trigger={
        <JourneyBar
          segments={flight.segments}
        />
      }
    >
      <JourneyDetails
        flight={flight}
        baggageAllowance={baggageAllowance}
      />
    </Collapsible>
  );

FlightJourneyDetailsPanel.propTypes = {
  flight: PropTypes.string.isRequired,
  baggageAllowance: PropTypes.string.isRequired,
};

export default FlightJourneyDetailsPanel;
