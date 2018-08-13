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

const rootReducer = combineReducers({
  domain
});

export default rootReducer;