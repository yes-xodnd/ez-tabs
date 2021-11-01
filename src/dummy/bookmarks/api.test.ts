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

const targetNodeId = '521';

describe('Bookmarks dummy api', () => {
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
    const [ node ] = await api.get(targetNodeId);
    expect(node).toEqual(targetNode);
  });

  test('rename and return updated node', async () => {
    const nextName = 'nextName';
    const node = await api.update(targetNodeId, { title: nextName });
    expect(node?.title).toBe(nextName);
    await api.update(targetNodeId, { title: 'NTS WIT블로그' })
  });

  
  test('move', async () => {
    const parentId = '523';
    const nextParentId = '2';
    const node = await api.move(targetNodeId, { parentId: nextParentId }) as BookmarkNode;
    const [ parentNode ] = await api.get(parentId) as BookmarkNode[];
    const [ nextParentNode ] = await api.get(nextParentId) as BookmarkNode[];

    expect(node.parentId).toBe('2');

    expect(parentNode.children?.filter(node => node.id === targetNodeId))
    .toHaveLength(0);
    expect(nextParentNode.children?.filter(node => node.id === targetNodeId))
    .toHaveLength(1);

    await api.move(targetNodeId, { parentId });
  });

  test('remove node', async () => {
    let [ node ] = await api.get(targetNodeId) as BookmarkNode[];
    await api.remove(targetNodeId);

    const [ nodeRemoved ] = await api.get(targetNodeId);
    const [ parentNode ] = await api.get(node.parentId as string);

    expect(nodeRemoved).toBeUndefined();
    expect(parentNode?.children?.includes(node)).toBeFalsy();
  });

  test('create node', async () => {
    const { url, title, parentId } = targetNode;
    
    await api.create({ url, title, parentId });

    const [ parentNode ] = await api.get(parentId);
    const res = parentNode?.children
      ?.filter(node => node.title === title && node.url === url);
    
    expect(res).toHaveLength(1);
  });

  test('removeTree', async () => {
    const tree = await api.removeTree('1');
    const [ node ] = await api.get('1');
    expect(node).toBeUndefined();
  });
});