import { schema } from 'normalizr';
import axios from 'axios';

const callApi = ({endpoint, method, body, schema}) => {  
  return axios({
        url: endpoint,
        headers: {
            'Accept': 'application/json'
        },
        method: !method ? 'get' : method,
        data: body
    })
    .then(function(response) {
      return response.data;
    });
};

const gameSchema = new schema.Entity('games', {}, {
  idAttribute: game => game._id
});

const pickSchema = new schema.Entity('picks', {}, {
  idAttribute: pick => pick._id
});

const leaderSchema = new schema.Entity('leaders', {}, {
  idAttribute: leader => leader._id
});

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user._id
});

export const Schemas = {
  GAME: gameSchema,
  GAME_ARRAY: [gameSchema],
  PICK: pickSchema,
  PICK_ARRAY: [pickSchema],
  LEADER: leaderSchema,
  LEADER_ARRAY: [leaderSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema]
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { method, body, schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi({endpoint, method, body, schema}).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};