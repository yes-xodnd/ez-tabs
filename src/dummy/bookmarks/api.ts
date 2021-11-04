import { BookmarkNode } from 'src/constants/types';
import nodes from './nodes';

type NodeMap = Map<string, BookmarkNode>;

interface CreateDetails {
  index?: number;
  parentId?: string;
  title?: string;
  url?: string;
}

let nodeDataList = nodes;
let nodeMap: NodeMap = new Map();
let tree: BookmarkNode[];
let isUpdated = true;

const nextId = (() => {
  let _nextId = 600;
  return (): string => (_nextId++).toString();
})();

function createTree() {
  nodeMap = nodeDataList.reduce(
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
  if (!tree || isUpdated) createTree();

  const idList = (typeof id === 'string') ? [ id ] : id;
  return idList.map(id => nodeMap.get(id));
};

async function getChildren(id: string) {
  if (!tree || isUpdated) createTree();
  return nodeMap.get(id)?.children;
}

async function remove(id: string) {
  if (nodeMap.has(id)) {
    nodeDataList = nodeDataList.filter(node => node.id !== id);
    isUpdated = true;
  }

  return getTree();
}

async function removeTree(id: string) {
  const node = nodeMap.get(id);
  const targetIds: string[] = [];
  let queue = [ node ];
  
  if (!node) return getTree();
  
  while (queue.length) {
    const node = queue.shift() as BookmarkNode;
    targetIds.push(node.id);

    if (node.children) queue.concat(node.children);
  }

  nodeDataList = nodeDataList.filter(node => !targetIds.includes(node.id));
  isUpdated = true;
  return getTree();
}

async function create({ url = '', title = '', parentId = '0' }: CreateDetails) {

  const id = nextId();
  const node: BookmarkNode = { id, title, parentId };
  
  if (url) node.url = url;
  else node.children = [];
  
  nodeDataList.push(node);
  createTree();

  const [ res ] = await api.get(id);
  return res as BookmarkNode;
}

async function update(id: string, changes: { url?: string, title?: string }) {
  const { title } = changes;
  
  const nodeData = nodeDataList.find(node => node.id === id);
  if (nodeData && title) nodeData.title = title;

  isUpdated = true;
  const [ node ] = await get(id);
  return node;
}

async function move(id: string, destination: { index?: number, parentId: string }) {
  const nodeData = nodeDataList.find(node => node.id === id);
  
  if (nodeData) {
    nodeData.parentId = destination.parentId;
    isUpdated = true;
  }
  
  const [ node ] = await get(id);
  return node as BookmarkNode;
}

async function search(query: string) {
  console.log('[dev] bookmarks search:', query);
  return nodes.slice(1, 4);
}

const api = {
  create,
  get,
  getChildren,
  getTree,
  remove,
  removeTree,
  update,
  move,
  search,
};

export default api;