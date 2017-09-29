import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import shortid from 'shortid';
import InfoItem from './InfoItem';

const pluralise =
  (itemCount, singular, plural) => (
    itemCount === 1 ? singular : plural
  );

const getCheckedBagText =
  (baggageAllowance) => {
    const checkedBagsPieces = baggageAllowance.pieces;
    const checkedBagsWeight = baggageAllowance.weight;

    if (checkedBagsPieces > 0 && checkedBagsWeight === 0) {
      return `${checkedBagsPieces} ${pluralise(checkedBagsPieces, ' piece', ' pieces')}`;
    } else if (checkedBagsPieces === 0 && checkedBagsWeight > 0) {
      return `Up to ${checkedBagsWeight}kg total`;
    } else if (checkedBagsPieces > 0 && checkedBagsWeight > 0) {
      return `${checkedBagsPieces} x ${checkedBagsWeight}kg bags`;
    }
    return 'Hand baggage only';
  };

const mapSegments =
  (flight, baggageAllowance) => flight.segments.map(segment => (
    <div className="info-panel" key={shortid.generate()}>
      <InfoItem
        label="Depart"
        displayText={`${segment.depart.location.name} (${segment.depart.location.code}) @ ${moment(segment.depart.dateTime).format('HHmm')}`}
      />
      <InfoItem
        label="Arrive"
        displayText={`${segment.arrive.location.name} (${segment.arrive.location.code}) @ ${moment(segment.arrive.dateTime).format('HHmm')}`}
      />
      <InfoItem
        label="Duration"
        displayText={`${segment.travelTimeMinutes}`}
        m
      />
      <InfoItem
        label="Operator"
        displayText={`${segment.operatingAirline.name}`}
      />
      <InfoItem
        label="Flight #"
        displayText={`${segment.flightNumber}`}
      />
      <InfoItem
        label="Aircraft Type"
        displayText={`${segment.aircraft}`}
      />
      <InfoItem
        label="Luggage"
        displayText={`${getCheckedBagText(baggageAllowance)}`}
      />
      {segment.package ? <InfoItem label="Package" displayText={`${segment.package.name}`} /> : ''}
      <hr />
    </div>
  ));

const flightsComp =
  (flight, baggageAllowance) => (
    <div>
      { mapSegments(flight, baggageAllowance) }
    </div>
  );

const FlightJourneyDetails =
  ({ flight, baggageAllowance }) => (
    <div className="info-item">
      {flightsComp(flight, baggageAllowance)}
    </div>
  );

FlightJourneyDetails.propTypes = {
  flight: PropTypes.shape({
    segments: PropTypes.array,
  }).isRequired,
  baggageAllowance: PropTypes.shape({
    pieces: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
};

export default FlightJourneyDetails;
