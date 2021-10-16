import apiDummy from 'src/dummy/api';

export default (process.env.NODE_ENV === 'production')
  ? chrome.bookmarks
  : apiDummy;
