import React from 'react';
import PropTypes from 'prop-types';

const RefreshingPanel =
  ({ refreshing }) => {
    if (refreshing) {
      return <div className="refreshing-panel">Refreshing</div>;
    }
    return null;
  };

RefreshingPanel.propTypes = {
  refreshing: PropTypes.bool.isRequired,
};

export default RefreshingPanel;
