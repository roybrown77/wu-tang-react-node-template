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

const homeSchema = new schema.Entity('homes', {}, {
  idAttribute: home => home._id
});

export const Schemas = {
  HOME: homeSchema,
  HOME_ARRAY: [homeSchema]
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