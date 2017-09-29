import React from 'react';
import PropTypes from 'prop-types';

const InfoItem =
  ({ label, displayText, fullWidth, href }) => (
    <div className={fullWidth ? 'info-item-full-width' : 'info-item'}>
      <p className="label">{label}</p>
      <p>
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
};

InfoItem.defaultProps = {
  fullWidth: false,
  displayText: 'None',
  href: '',
};

export default InfoItem;
