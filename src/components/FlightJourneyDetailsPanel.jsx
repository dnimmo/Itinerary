import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import JourneyBar from './FlightJourneyBar';
import JourneyDetails from './FlightJourneyDetails';

const FlightJourneyDetailsPanel =
  ({ flight, baggageAllowance }) => (
    <div>
      <Collapsible
        trigger={
          <JourneyBar
            flight={flight}
          />
        }
      >
        <JourneyDetails
          flight={flight}
          baggageAllowance={baggageAllowance}
        />
      </Collapsible>
    </div>
  );

FlightJourneyDetailsPanel.propTypes = {
  flight: PropTypes.string.isRequired,
  baggageAllowance: PropTypes.string.isRequired,
};

export default FlightJourneyDetailsPanel;
