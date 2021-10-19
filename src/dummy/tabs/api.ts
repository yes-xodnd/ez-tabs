import queryResult from './queryResult';
import { QueryInfo, Tab } from 'src/constants/types';

async function query(details: QueryInfo): Promise<Tab[]> {
  return queryResult;
}

const api = {
  query,
};

export default api;