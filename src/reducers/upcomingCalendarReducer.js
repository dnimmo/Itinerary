export const actionTypes = {
  SCROLL: 'SCROLL',
  FETCH_BOOKINGS: 'FETCH_BOOKINGS',
};

export const updateScrollPosition =
  ({ nodeHeight, position }) => {
    const xPosition = (position / nodeHeight) * 100;
    if (xPosition < 2) {
      return {
        type: actionTypes.SCROLL,
        data: 2,
      };
    } else if (xPosition > 94) {
      return {
        type: actionTypes.SCROLL,
        data: 94,
      };
    }
    return {
      type: actionTypes.SCROLL,
      data: xPosition,
    };
  };

export const updateCalendarMonths =
  ({ months }) => ({
    type: actionTypes.FETCH_BOOKINGS,
    data: months,
  });

const initialState = {
  scrollPosition: 2,
  calendarMonths: [],
};

export const reducer =
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SCROLL:
        return { ...state, scrollPosition: action.data };
      case action.FETCH_BOOKINGS:
        return { ...state, months: action.data };
      default:
        return state;
    }
  };

export default reducer;
