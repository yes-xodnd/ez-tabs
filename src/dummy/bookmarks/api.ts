import { BookmarkNode } from 'src/constants/types';
import nodes from './nodes';

type NodeMap = Map<string, BookmarkNode>;

interface CreateDetails {
  index?: number;
  parentId?: string;
  title?: string;
  url?: string;
}

let nodeList = nodes;
let nodeMap: NodeMap = new Map();
let tree: BookmarkNode[];
let isUpdated = true;

const nextId = (() => {
  let _nextId = 600;
  return (): string => (_nextId++).toString();
})();

function createTree() {
  nodeMap = nodeList.reduce(
    (map, node) => map.set(node.id, { ...node }), 
    new Map()
  );

  for (const node of nodeMap.values()) {
    if (!node.url) node.children = [];
  }

  for (const node of nodeMap.values()) {
    if (node.parentId) {
      const parentNode = nodeMap.get(node.parentId);
      parentNode?.children?.push(node);
    }
  }

  for (const node of nodeMap.values()) {
    if (node.children) {
      node.children = node.children
        .sort((a, b) => Number(a.id) - Number(b.id));
    }
  }

  tree = [ nodeMap.get('0') as BookmarkNode ];
  isUpdated = false;
  return tree;
}

async function getTree() {
  if (!tree || isUpdated) createTree();
  return tree;
}

async function get(id: string | string[]) {
  if (!tree) getTree();

  const idList = (typeof id === 'string') ? [ id ] : id;
  return idList.map(id => nodeMap.get(id));
};

async function remove(id: string) {
  if (nodeMap.has(id)) {
    nodeList = nodeList.filter(node => node.id !== id);
  }

  isUpdated = true;
  return getTree();
}

async function removeTree(id: string) {
  const node = nodeMap.get(id) as BookmarkNode;
  const targetIds: string[] = [];
  let queue = [ node ];
  
  while (queue.length) {
    const node = queue.shift() as BookmarkNode;
    targetIds.push(node.id);

    if (node.children) queue.concat(node.children);
  }

  nodeList = nodeList.filter(node => !targetIds.includes(node.id));
  isUpdated = true;
  return getTree();
}

async function create({ url = '', title = '', parentId = '0' }: CreateDetails) {

  const id = nextId();
  const node: BookmarkNode = { id, title, parentId };
  
  if (url) node.url = url;
  else node.children = [];
  
  nodeList.push(node);
  createTree();

  const [ res ] = await api.get(id);
  return res as BookmarkNode;
}

const api = {
  get,
  getTree,
  remove,
  removeTree,
  create,
};

export default api;