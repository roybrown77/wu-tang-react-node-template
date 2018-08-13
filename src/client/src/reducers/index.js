import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import * as ActionTypes from '../actions';

const domain = (
  state = Map({
    dataLoading: false
  }), 
  action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

const rootReducer = combineReducers({
  domain,
	errorMessage
});

export default rootReducer;