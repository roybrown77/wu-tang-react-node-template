import {combineReducers} from 'redux';

import {albumReducer} from './albumReducer';

const rootReducer = combineReducers({
  albumList: albumReducer
});

export default rootReducer;