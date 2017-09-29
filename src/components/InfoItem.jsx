import React from 'react';
import PropTypes from 'prop-types';

const InfoItem =
  ({ label, displayText, fullWidth, href, emphasise, imageUrl }) => (
    <div className={fullWidth ? 'info-item-full-width' : 'info-item'}>
      {
        imageUrl !== ''
          ? <img className="detail-icon" alt="" src={imageUrl} />
          : null
      }
      <p className="label">{label}</p>
      <p className={emphasise ? 'info-emphasis' : ''}>
        {
          href && displayText !== 'Not recorded'
            ? <a href={href}>{displayText}</a>
            : displayText
        }
      </p>
    </div>
  );

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  displayText: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  emphasise: PropTypes.bool,
  imageUrl: PropTypes.string,
};

InfoItem.defaultProps = {
  fullWidth: false,
  displayText: 'None',
  href: '',
  emphasise: false,
  imageUrl: '',
};

export default InfoItem;
