import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import currencyFormatter from 'currency-formatter';
import CollapsibleInfo from './CollapsibleInfo';

const InfoItem =
    ({ label, displayText }) => (<div className="info-item">
      <p className="label">{label}</p>
      <p>{displayText}</p>
    </div>);

const InfoItemFullWidth =
  ({ label, displayText }) => (<div className="info-item-full-width">
    <p className="label">{label}</p>
    <p>{displayText}</p>
  </div>);

const InfoItemMultiple =
  ({ label, displayText }) => (<div className="info-item-full-width">
    <p className="label">{label}</p>
    {displayText}
  </div>);

const InfoItemMultipleWithDefault =
  ({ label, displayText, defaultValue }) => (<div className="info-item-full-width">
    <p className="label">{label}</p>
    {displayText.length ? displayText : defaultValue}
  </div>);

const createAddressLineElement =
  addressLine => ({ id: shortid.generate(), value: addressLine });

const createAdditionElement =
  addition => ({ id: shortid.generate(), value: addition });

const getAddressComp =
  address => (address.map((addressLine) => {
    const { id, value } = createAddressLineElement(addressLine);
    return <p key={id}>{value}</p>;
  }));

const checkIfAdditionSelected =
  (selectedAdditions, { id }) => (selectedAdditions.includes(x => id === x.id));

const getSelectedAdditionsComp =
  (selectedAdditions, additions) => (
    additions.map((addition) => {
      if (addition.included || checkIfAdditionSelected(selectedAdditions, addition)) {
        const additionElement = createAdditionElement(addition);
        return <p key={additionElement.id}>{additionElement.value.description} (Included)</p>;
      }
      return null;
    })
  );

const getProfileImageUrlComp =
  (profileImageUrl) => {
    if (profileImageUrl.urls[0]) {
      return (
        <div className="hotel-image">
          <img className="detail-icon" alt="" src={profileImageUrl.urls[0]} />
        </div>
      );
    }
    return null;
  };

const HotelInfoPanel =
    ({
      reference,
      bookingId,
      currency,
      totalRoomRate,
      cancelAmendTerms,
      address,
      profileImageUrl,
      phone,
      email,
      roomType,
      additions,
      selectedAdditions,
    }) => (
      <div className="info-panel">
        <InfoItemMultiple label="Address" displayText={getAddressComp(address)} />
        <InfoItem label="Phone" displayText={phone} />
        <InfoItem label="Email" displayText={email} />
        {getProfileImageUrlComp(profileImageUrl)}
        <InfoItem label="Reference" displayText={reference} />
        <InfoItemFullWidth label="Room Type" displayText={roomType} />
        <InfoItemMultipleWithDefault
          label="Additions"
          displayText={getSelectedAdditionsComp(selectedAdditions, additions)
            .filter(ad => (ad !== null))}
          defaultValue="None"
        />
        <InfoItem label="Booking ID" displayText={bookingId} />
        <InfoItem
          label="Total Rate"
          displayText={currencyFormatter.format(totalRoomRate, { code: currency })}
        />
        <CollapsibleInfo title="Cancellation policy" info={cancelAmendTerms} />
      </div>
    );

HotelInfoPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalRoomRate: PropTypes.string.isRequired,
  cancelAmendTerms: PropTypes.string.isRequired,
  address: PropTypes.arrayOf(PropTypes.string).isRequired,
  profileImageUrl: PropTypes.shape({}).isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string,
  roomType: PropTypes.string.isRequired,
  additions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedAdditions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

InfoItemFullWidth.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
};

InfoItemMultiple.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

InfoItemMultipleWithDefault.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  defaultValue: PropTypes.string.isRequired,
};

HotelInfoPanel.defaultProps = {
  email: 'Not recorded',
  phone: 'Not recorded',
};

export default HotelInfoPanel;
