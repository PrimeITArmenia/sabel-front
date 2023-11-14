import axios from "axios";
import {url} from '@/api'

const fetcher = axios.create({
  baseURL: url,
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default fetcher;