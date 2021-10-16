import { BookmarkNode } from 'src/constants/types';
import nodes from './nodes';

const api = ((nodeListRaw: BookmarkNode[]) => {
  
  const nodeList: BookmarkNode[] = (() => {
    const nodeList: BookmarkNode[] = JSON.parse(JSON.stringify(nodeListRaw));

    for (const node of nodeList) {
      if (!node.parentId) continue;
      const parentNode = nodeList.find(v => v.id === node.parentId) as BookmarkNode;

      parentNode.children
      ? parentNode.children.push(node)
      : parentNode.children = [ node ];
    }

    return nodeList;
  })();


  async function get(idOrIdList: string | string[])
  : Promise<(BookmarkNode | undefined)[] > {
    let idList: string[] = (typeof idOrIdList === 'string') ? [ idOrIdList ] : idOrIdList;

    return idList.map(id => nodeList.find(node => node.id === id));
  }

  async function getTree() { 
    return [ nodeList[0] ];
  }

  return {
    get,
    getTree,
  };

})(nodes);

export default api;