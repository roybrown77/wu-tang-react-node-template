import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import * as ActionTypes from '../actions';

const homeDomain = (
  state = Map({ 
    homes: List(), 
    dataLoading: false 
  }), 
  action) => {
  switch (action.type) {
    case ActionTypes.HOMES_REQUEST:
      return state.set('dataLoading', true);
    case ActionTypes.HOMES_SUCCESS:
      if (action.response) {
        const homeList = action.response.map(item=>{
          return Map(item);
        });

        return state.set('homes', List(homeList)).set("dataLoading", false);
      }
      return state;
    case ActionTypes.HOMES_FAILURE:
      return state.set('dataLoading', false);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  homeDomain
});

export default rootReducer;