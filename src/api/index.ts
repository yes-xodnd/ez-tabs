import bookmarksDummy from 'src/dummy/bookmarks/api';
import tabsDummy from 'src/dummy/tabs/api';

const api = (process.env.NODE_ENV === 'production')
  ? { 
    bookmarks: chrome.bookmarks,
    tabs: chrome.tabs
  }
  : { 
    bookmarks: bookmarksDummy,
    tabs: tabsDummy
  };

export const onTabsChange = (listener: () => void) => {
  api.tabs.onRemoved.addListener(listener);
  api.tabs.onCreated.addListener(listener);
  api.tabs.onUpdated.addListener(listener);
  api.tabs.onMoved.addListener(listener);
  api.tabs.onReplaced.addListener(listener);
}

export default api;