import {albumActionTypes} from '../constants/actionTypes';

const initialState = {
  items: [],
  dataLoading: false
};

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case albumActionTypes.ALBUMCOVERS_REQUEST:
      return {
        ...state,
        dataLoading: true
      };
    case albumActionTypes.ALBUMCOVERS_SUCCESS:
      return {
          ...state,
          items: action.response,
          dataLoading: false
        };
    case albumActionTypes.ALBUMCOVERS_FAILURE:
      return {
        ...state,
        dataLoading: false
      };
    default:
      return state;
  }
};