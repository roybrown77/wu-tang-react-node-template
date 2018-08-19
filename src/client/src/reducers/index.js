import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import * as ActionTypes from '../actions';

const albumDomain = (
  state = Map({ 
    albumCovers: List(), 
    dataLoading: false 
  }), 
  action) => {
  switch (action.type) {
    case ActionTypes.ALBUMCOVERS_REQUEST:
      return state.set('dataLoading', true);
    case ActionTypes.ALBUMCOVERS_SUCCESS:
      if (action.response) {
        const albumCoverList = action.response.map(item=>{
          return Map(item);
        });
        return state.set('albumCovers', List(albumCoverList)).set("dataLoading", false);
      }
      return state;
    case ActionTypes.ALBUMCOVERS_FAILURE:
      return state.set('dataLoading', false);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  albumDomain
});

export default rootReducer;