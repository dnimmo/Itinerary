import React from 'react';
import PropTypes from 'prop-types';

const ExtraOptionsComponent =
  ({ title, mainText, linkText, linkHref }) => (
    <div className="added-options-component" >
      <header>{title}</header>
      <p>{mainText}</p>
      <a href={linkHref}>{linkText}</a>
    </div>
  );

ExtraOptionsComponent.propTypes = {
  title: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
};

export default ExtraOptionsComponent;
