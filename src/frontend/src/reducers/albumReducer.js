import {albumActionTypes} from '../constants/actionTypes';

const initialState = {
  items: [],
  dataLoading: false,
  loadingComplete: false
};

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case albumActionTypes.ALBUMCOVERS_REQUEST:
      return {
        ...state,
        dataLoading: true,
        loadingComplete: false
      };
    case albumActionTypes.ALBUMCOVERS_SUCCESS:
      return {
          ...state,
          items: action.response,
          dataLoading: false,
          loadingComplete: true
        };
    case albumActionTypes.ALBUMCOVERS_FAILURE:
      return {
        ...state,
        dataLoading: false,
        loadingComplete: true
      };
    default:
      return state;
  }
};