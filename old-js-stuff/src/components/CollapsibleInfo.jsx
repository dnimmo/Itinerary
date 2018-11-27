import React from 'react';
import PropTypes from 'prop-types';

// TODO: Refactor className to correct spelling of "collapsible"
const CollapsibleInfo =
  ({ title, info }) => (
    <div className="collapsable-info">
      <header>{title}</header>
      <p>{info}</p>
    </div>
  );

CollapsibleInfo.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default CollapsibleInfo;
