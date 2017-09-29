import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const getRefreshIconClasses = (loading) => {
  if (!navigator.onLine) return 'icon-loop2 disabled';
  return loading ? 'icon-loop2 rotate disabled' : 'icon-loop2';
};

const hackyScrollToSelectedMonthFunc = () => {
  const monthSelect = document.getElementById('monthSelection');
  const selectedMonth = monthSelect.options[monthSelect.selectedIndex].innerText.replace(' ', '');
  const fixedHeight = 65;
  document.getElementById(selectedMonth).scrollIntoView(true);
  const scrolledY = window.scrollY;
  if (scrolledY) {
    window.scroll(0, scrolledY - fixedHeight);
  }
};

const Toolbar = ({
  profile,
  refreshBookings,
  monthsWithBookings,
  loading,
}) => (
  <div className="toolbar">
    <select id="monthSelection" onChange={hackyScrollToSelectedMonthFunc}>
      {monthsWithBookings.map(month =>
        <option key={month} value={month}>{month}</option>,
      )}
    </select>
    <Link to={'/log-out'} ><div className="icon-exit" /></Link>
    <button onClick={refreshBookings} className={getRefreshIconClasses(loading)} />
    <img src={(profile && profile.image) ? profile.image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=30&d=mm&r=g'} alt="" />
  </div>
);

Toolbar.propTypes = {
  monthsWithBookings: PropTypes.arrayOf(PropTypes.string).isRequired,
  profile: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
  refreshBookings: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Toolbar.defaultProps = {
  loading: true,
};

export default Toolbar;
