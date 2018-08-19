import queryString from 'query-string';
import URLSearchParams from 'url-search-params';

import get from 'lodash/get';
import last from 'lodash/last';

import { CALL_API, Schemas } from '../middleware/api';
import history from '../middleware/history';

export const ALBUMCOVERS_REQUEST = 'ALBUMCOVERS_REQUEST';
export const ALBUMCOVERS_SUCCESS = 'ALBUMCOVERS_SUCCESS';
export const ALBUMCOVERS_FAILURE = 'ALBUMCOVERS_FAILURE';

const fetchAlbumCovers = query => ({
  [CALL_API]: {
    types: [ ALBUMCOVERS_REQUEST, ALBUMCOVERS_SUCCESS, ALBUMCOVERS_FAILURE ],
    endpoint: `/api/albummanagement/albumcovers?${queryString.stringify(query)}`,
    schema: Schemas.ALBUMCOVER_ARRAY
  }
});

export const getAlbumCovers = (query, requiredFields = []) => (dispatch, getState) => {
  return dispatch(fetchAlbumCovers(query));
};