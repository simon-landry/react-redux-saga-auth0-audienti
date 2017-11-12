import invariant from 'invariant';

/**
 * requestStatusMiddleware takes an API Request action and handles updating the state
 * when requesting as well as dispatching actions for success and failure cases.
 */
export default function requestStatusMiddleware({ dispatch }) {
  return next => async action => {
    const { types, apiCall, payload = {} } = action;

    // requestStatusMiddleware requires 3 action types, *_REQUEST, *_SUCCESS, *_FAILURE.
    // If the `types` key is absent, pass this action along to the next middleware.
    if (!types) {
      return next(action);
    }

    // The `types` key must be an array of 3 strings. If not, throw an error.
    invariant(
      Array.isArray(types) &&
        types.length === 3 &&
        types.every(type => typeof type === 'string'),
      'requestStatusMiddleware expected `types` to be an array of 3 strings'
    );

    // The `apiCall` key must be a function.
    invariant(
      typeof apiCall === 'function',
      'requestStatusMiddleware expected `apiCall` to be a function'
    );

    const [requestType, successType, failureType] = types;

    dispatch({ type: requestType, payload });

    const data = await apiCall(payload);
    const { response, error } = data || { error: 'empty' };
    if (error || !response.body) {
      dispatch({
        type: failureType,
        error: true,
        payload: error,
        request: payload
      });
    } else if (response.body.error) {
      dispatch({
        type: failureType,
        error: true,
        payload: response.body.error,
        request: payload
      });
    } else {
      dispatch({ type: successType, payload: response.body, request: payload });
    }
    return true;
  };
}
