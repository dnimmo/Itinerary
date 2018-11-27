import React from 'react';
import { Link } from 'react-router-dom';

const CloseButton =
  () => (
    <Link to={'/upcoming-calendar'} className="icon-cross" />
  );

export default CloseButton;
