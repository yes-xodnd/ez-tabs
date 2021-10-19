import { BookmarkNode, ChildNode, ParentNode } from 'src/constants/types';
import nodes from './nodes';

interface CreateDetails {
  index?: number;
  parentId?: string;
  title?: string;
  url?: string;
}

const nodeMap = createNodeMap();
const nextId = (() => {
  let _nextId = 600;
  return (): string => (_nextId++).toString();
})();

function createNodeMap(): Map<string, BookmarkNode> {
  
  const nodeMap = nodes.reduce(
    (map, node) => map.set(node.id, { ...node }),
    new Map<string, BookmarkNode>()
  );

  for (const node of nodeMap.values()) {
    if (!node.url) node.children = [];
  }

  for (const node of nodeMap.values()) {
    if (!node.parentId) continue;
    const parentNode = nodeMap.get(node.parentId) as ParentNode;
    parentNode.children.push(node);
  }

  for (const node of nodeMap.values()) {
    if (!node.children) continue;
    node.children = node.children.sort((a, b) => Number(a.id) - Number(b.id));
  }
  return nodeMap;
}

async function get(id: string | string[]) : Promise<(BookmarkNode | undefined)[] > {
  let idList: string[] = (typeof id === 'string') ? [ id ] : id;
  return idList.map(id => nodeMap.get(id));
}

async function getTree() {
  return [ nodeMap.get('0') as BookmarkNode ];
}

async function remove(id: string): Promise<BookmarkNode[]> {
  const node = nodeMap.get(id) as ChildNode;
  const parentNode = nodeMap.get(node.parentId) as ParentNode;
  const index = parentNode.children.findIndex(childNode => childNode.id === id);
  parentNode.children.splice(index, 1);
  nodeMap.delete(id);

  return getTree();
}

async function removeTree(id: string) {
  const [ targetNode ] = await get(id);
  if (!targetNode) return;

  const idList: string[] = [];
  let queue: BookmarkNode[] = [ targetNode ];

  while (queue.length) {
    const node = queue.shift() as BookmarkNode;

    if (node.children?.length) {
      queue.concat(node.children);
      idList.concat(node.children.map(({ id }) => id));
    }
  }

  idList.forEach(nodeMap.delete);
  return remove(id);
}

function create({title = 'no name', parentId = '0', url }: CreateDetails)
: Promise<BookmarkNode[]> {
  const id = nextId();
  const parentNode = nodeMap.get(parentId) as ParentNode;
  const node: BookmarkNode = { id, title, parentId };
  
  if (url) node.url = url;
  else node.children = [];
  
  if (parentNode.children.length) {
    const lastChild = parentNode.children.slice(-1)[0] as ChildNode;
    node.index = lastChild.index + 1;
  } else {
    node.index = 0;
  }
  
  nodeMap.set(id, node);
  parentNode.children.push(node);

  return getTree();
}

const api = {
  create,
  get,
  getTree,
  remove,
  removeTree,
};

export default api;