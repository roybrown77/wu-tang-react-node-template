import { schema } from 'normalizr';

import { CALL_API } from '../middleware/api';
import {albumActionTypes} from '../constants/actionTypes';

const albumCoverSchema = new schema.Entity('albumCovers', {}, {
  idAttribute: albumCover => albumCover._id
});

const Schemas = {
  ALBUMCOVER: albumCoverSchema,
  ALBUMCOVER_ARRAY: [albumCoverSchema]
};

const fetchAlbumCovers = query => ({
  [CALL_API]: {
    types: [ albumActionTypes.ALBUMCOVERS_REQUEST, albumActionTypes.ALBUMCOVERS_SUCCESS, albumActionTypes.ALBUMCOVERS_FAILURE ],
    endpoint: `/api/albummanagement/albumcovers`,
    schema: Schemas.ALBUMCOVER_ARRAY
  }
});

export const getAlbumCovers = (query, requiredFields = []) => (dispatch, getState) => {
  return dispatch(fetchAlbumCovers(query));
};