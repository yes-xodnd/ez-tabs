import bookmarksDummy from 'src/dummy/bookmarks/api';
import tabsDummy from 'src/dummy/tabs/api';

export default (process.env.NODE_ENV === 'production')
  ? { 
    bookmarks: chrome.bookmarks,
    tabs: chrome.tabs
  }
  : { 
    bookmarks: bookmarksDummy,
    tabs: tabsDummy
  };
