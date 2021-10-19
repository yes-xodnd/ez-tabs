import { BookmarkNode } from 'src/constants/types'; 
import api from './api';
import getTree from './getTree';

const targetNode = {
  dateAdded: 1631599599991,
  index: 0,
  id: "521",
  parentId: "523",
  title: "NTS WIT블로그",
  url: "https://wit.nts-corp.com/",
};

const targetId = '521';

describe('Dummy api', () => {
  test('getTree', async () => {
    const [ root ] = await api.getTree();
    const [ rootCompare ] = await getTree();

    expect(root).toEqual(rootCompare);
    
  });

  test('sort children by index asc', async () => {
    let queue = await api.getTree();
    let result = true;
    
    while (queue.length) {
      const node = queue.shift();
      if (node?.children) {
        const indexes = node.children.map(({ index }) => index as number);
        const indexesSorted = indexes.sort((a, b) => a - b);

        if (indexes.join('') !== indexesSorted.join('')) {
          result = false;
          break;
        }
        queue.concat(node.children);
      }
    }

    expect(result).toBe(true);
  });

  test('get node with id', async () => {
    const [ node ] = await api.get(targetId);
    expect(node).toEqual(targetNode);
  });

  test('remove node', async () => {
    await api.remove(targetId);
    const getResult = await api.get(targetId);
    const tree = await api.getTree();
    const getResultFromTree = getFromTree(tree, targetId);

    expect(getResult[0]).toBeUndefined();
    expect(getResultFromTree).toBeUndefined();
  });
});

function getFromTree(tree: BookmarkNode[], id: string): BookmarkNode | undefined {
  let queue = tree;
  
  while (queue.length) {
    const node = queue.shift() as BookmarkNode;
    if (!node.children) continue;

    const target = node.children.find(childNode => childNode.id === id);
    if (target) return target;
    queue.concat(node.children);
  }
}