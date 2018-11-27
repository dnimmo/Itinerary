import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


// TODO: Refactor TrainJourneyDetails component to use the generalised InfoItem.jsx component
const InfoItem =
  ({ label, displayText }) => (
    <div className="info-item">
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>
  );

const InfoItemFullWidth =
  ({ label, displayText }) => (
    <div className="info-item-full-width">
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>
  );

const mapLegs =
  (journey, routeRestriction) => journey.legs.map(leg => (
    <div className="info-panel" key={leg.id}>
      <InfoItem
        label="Depart"
        displayText={`${leg.depart.location.name} (${leg.depart.location.crs}) @ ${moment(leg.depart.dateTime).format('HHmm')}`}
      />
      <InfoItem
        label="Arrive"
        displayText={`${leg.arrive.location.name} (${leg.arrive.location.crs}) @ ${moment(leg.arrive.dateTime).format('HHmm')}`}
      />
      <InfoItem label="Duration" displayText={`${leg.travelTimeMinutes}m`} />
      <InfoItem label="Ticket Type" displayText={journey.ticketType.name} />
      <InfoItem label="Operator" displayText={leg.serviceProvider.name} />
      <InfoItem label="Ultimate Destination" displayText={leg.ultimateDestination.name} />
      <InfoItem label="Seat Number" displayText={leg.seatNumber} />
      <InfoItemFullWidth label="Route Restriction" displayText={routeRestriction} />
      <hr />
    </div>
  ));

const journeyscomp =
  (journey, routeRestriction) => [
    mapLegs(journey, routeRestriction),
    <br />,
  ];

const TrainJourneyDetails =
  ({ journey, routeRestriction }) => journeyscomp(journey, routeRestriction);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

InfoItem.defaultProps = {
  displayText: '...',
};

InfoItemFullWidth.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

InfoItemFullWidth.defaultProps = {
  displayText: '...',
};

TrainJourneyDetails.propTypes = {
  journey: PropTypes.shape({}).isRequired,
  routeRestriction: PropTypes.string.isRequired,
};


export default TrainJourneyDetails;
