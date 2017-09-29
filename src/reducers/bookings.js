import { bookingsToCards } from '../utilities/bookings_utility';

export const actionTypes = {
  UPDATE_BOOKINGS: 'UPDATE_BOOKINGS',
  UPDATE_FETCHED: 'UPDATE_FETCHED',
};

export const fetched = {
  NO: 'NO',
  YES: 'YES',
  REQUESTED: 'REQUESTED',
};

export const updateBookings =
  data => ({
    type: actionTypes.UPDATE_BOOKINGS,
    monthsWithBookings: bookingsToCards(data).map(({ label }) => label),
    data,
  });

export const updateRequested =
  () => ({
    type: actionTypes.UPDATE_FETCHED,
    data: fetched.REQUESTED,
  });

const initialState = {
  bookings: [],
  monthsWithBookings: [],
  fetched: fetched.NO,
};

export const bookings =
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_BOOKINGS:
        return {
          ...state,
          bookings: action.data,
          fetched: fetched.YES,
          monthsWithBookings: action.monthsWithBookings,
        };
      case actionTypes.UPDATE_FETCHED:
        return { ...state, fetched: action.data };
      default:
        return state;
    }
  };
