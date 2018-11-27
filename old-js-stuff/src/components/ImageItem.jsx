import React from 'react';
import PropTypes from 'prop-types';

const ImageItem =
  ({ label, imageBase64 }) => (
    <div className="info-item">
      <p className="label">{label}</p>
      <p><img src={`data:image/jpeg;base64, ${imageBase64}`} alt="Not provided" /></p>
    </div>
  );

ImageItem.propTypes = {
  label: PropTypes.string.isRequired,
  imageBase64: PropTypes.string,
};

ImageItem.defaultProps = {
  label: 'Barcode',
  imageBase64: '',
};

export default ImageItem;
