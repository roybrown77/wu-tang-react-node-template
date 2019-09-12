import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import {albumActionTypes} from '../constants/actionTypes';

const albumDomain = (
  state = Map({ 
    albumCovers: List(), 
    dataLoading: false 
  }), 
  action) => {
  switch (action.type) {
    case albumActionTypes.ALBUMCOVERS_REQUEST:
      return state.set('dataLoading', true);
    case albumActionTypes.ALBUMCOVERS_SUCCESS:
      if (action.response) {
        const albumCoverList = action.response.map(item=>{
          return Map(item);
        });
        return state.set('albumCovers', List(albumCoverList)).set("dataLoading", false);
      }
      return state;
    case albumActionTypes.ALBUMCOVERS_FAILURE:
      return state.set('dataLoading', false);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  albumDomain
});

export default rootReducer;