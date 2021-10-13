import getTreeDummy from "src/dummy/getTree";

const api = {
  getTree: getTreeDummy
};


if (process.env.NODE_ENV === 'production') {
  api.getTree = chrome.bookmarks.getTree;
}
  
export default api;