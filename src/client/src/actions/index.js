import queryString from 'query-string';
import URLSearchParams from 'url-search-params';

import get from 'lodash/get';
import last from 'lodash/last';

import { CALL_API, Schemas } from '../middleware/api';
import history from '../middleware/history';

export const HOMES_REQUEST = 'HOMES_REQUEST';
export const HOMES_SUCCESS = 'HOMES_SUCCESS';
export const HOMES_FAILURE = 'HOMES_FAILURE';

const fetchHomes = (query, types) => ({
  [CALL_API]: {
    types,
    endpoint: `/api/homemanagement/homes?${queryString.stringify(query)}`,
    schema: Schemas.HOME_ARRAY
  }
});

export const searchHomes = (query, requiredFields = []) => (dispatch, getState) => {
  return dispatch(fetchHomes(query));
};