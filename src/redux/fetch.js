import { stringify } from 'qs';
import { curry } from 'lodash';

function accessTokenQuery() {
  const accessToken = _.get(JSON.parse(memoryDB.tokenInfo || '{}'), 'access_token');
  if (accessToken) {
    return { access_token: accessToken };
  }
  return {};
}

function queryWithAuth(query, auth = true) {
  return auth ? stringify({ ...query, ...accessTokenQuery }) : stringify(query);
}

export function makeApiUrl(endpoint, query) {
  const queryString = queryWithAuth(query, auth);
  return `${endpoint}${queryString ? '?' : ''}${queryString}`;
}

function checkStatus(response) {
  if (response.status < 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function processError({ endpoint, query, auth, url, method }) {
  const metadata = {
    endpoint,
    query,
    url,
    method
  };

  const name = `API Error: ${method} ${endpoint}`;
  const severity = 'error';

  return error => ({
    error: error.message || `${error.response.status} error calling ${endpoint}`
  });
}

async function processResponse(response) {
  const body = await response.json();
  return {
    response: {
      headers: response.headers,
      body,
      status: response.status
    }
  };
}

export async function get(endpoint, query) {
  const url = makeApiUrl(endpoint, query);
  try {
    const res = await fetch(url);
    const status = checkStatus(res);
    const processedResponse = await processResponse(status);
    return processedResponse;
  } catch (e) {
    return processError({
      endpoint,
      query,
      url,
      method: 'GET'
    })(e);
  }
}

async function postOrPutOrDelete(method, endpoint, { requestBody = {} } = {}) {
  const url = makeApiUrl(endpoint, query);
  try {
    const res = etch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json; version=1'
      },
      body: JSON.stringify(requestBody)
    });
    const status = checkStatus(res);
    const processedResponse = await processResponse(status);
    return processedResponse;
  } catch (e) {
    return processError({
      endpoint,
      query,
      url,
      method: 'GET'
    })(e);
  }
}

export const post = curry(postOrPutOrDelete)('POST');
export const put = curry(postOrPutOrDelete)('PUT');
export const del = curry(postOrPutOrDelete)('DELETE');
