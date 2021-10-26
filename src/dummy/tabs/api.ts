import { QueryInfo, Tab } from 'src/constants/types';
import queryResultRaw from './queryResult';

type Listener = () => void;
type TabEvent = 'removed' | 'created' | 'moved' | 'replaced' | 'updated';

interface ListenerList {
  removed: Listener[];
  created: Listener[];
  updated: Listener[];
  moved: Listener[],
  replaced: Listener[];
}

const listenerList: ListenerList = {
  removed: [],
  created: [],
  updated: [],
  moved: [],
  replaced: [],
};

let queryResult = queryResultRaw;

const createAddListener = (listeners: Listener[]) => (listener: Listener): void => {
  listeners.push(listener);
}

const createOnEvent = (eventName: TabEvent) => {
  return {
    addListener: createAddListener(listenerList[eventName])
  };
}

async function query(details: QueryInfo): Promise<Tab[]> {
  return queryResult;
}

async function remove(id: number | number[]): Promise<void> {
  const tabIds = typeof id === 'number' ? [ id ] : id;
  queryResult = queryResult.filter(tab => !tabIds.includes(tab.id as number));
  
  if (listenerList.removed.length) {
    listenerList.removed.forEach(listener => listener());
  }
}

const api = {
  query,
  remove,
  onRemoved: createOnEvent('removed'),
  onCreated: createOnEvent('created'),
  onUpdated: createOnEvent('updated'),
  onMoved: createOnEvent('moved'),
  onReplaced: createOnEvent('replaced'),
};

export default api;