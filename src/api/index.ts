import axios from 'axios';
import { BASE_URL, DEFAULT_TIMEOUT_MS } from './constants';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: { 'X-Custom-Header': 'foobar' },
});
