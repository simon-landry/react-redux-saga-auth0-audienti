/* istanbul ignore file */
import { get, post, put, del } from 'redux/fetch';

export const apiBaseRoute = process.env.API_BASE_URL;

const create = model => payload =>
  post(`${apiBaseRoute}/${model}`, { requestBody: payload });
const update = model => (id, payload) =>
  put(`${apiBaseRoute}/${model}/${id}`, { requestBody: payload });
const remove = model => (id, payload) =>
  del(`${apiBaseRoute}/${model}/${id}`, { requestBody: payload });

const list = model => query => get(`${apiBaseRoute}/${model}`, query);
const read = model => id => get(`${apiBaseRoute}/${model}/${id}`);
const readData = model => subpath => ({ id, ...query }) =>
  get(`${apiBaseRoute}/${model}/${id}/${subpath}`, query);

export default model => ({
  create: create(model),
  update: update(model),
  remove: remove(model),
  list: list(model),
  read: read(model),
  readData: readData(model),
});
