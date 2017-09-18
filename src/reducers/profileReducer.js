export const actionTypes = {
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_FETCHED: 'UPDATE_FETCHED',
};

export const fetched = {
  NO: 'NO',
  YES: 'YES',
  REQUESTED: 'REQUESTED',
};

export const updateProfileRequested =
  () => ({
    type: actionTypes.UPDATE_FETCHED,
    data: fetched.REQUESTED,
  });

export const updateProfile =
  data => ({
    type: actionTypes.UPDATE_PROFILE,
    data,
  });

const initialState = {
  profile: {},
  fetched: fetched.NO,
};

export const reducer =
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_PROFILE:
        return { ...state, profile: action.data, fetched: fetched.YES };
      case actionTypes.UPDATE_FETCHED:
        return { ...state, fetched: action.data };
      default:
        return state;
    }
  };

export default reducer;
