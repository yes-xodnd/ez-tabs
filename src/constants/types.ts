export type BookmarkNode = chrome.bookmarks.BookmarkTreeNode;

export interface ChildNode extends BookmarkNode {
  index: number;
  parentId: string;
}

export interface ParentNode extends BookmarkNode {
  children: BookmarkNode[];
}

export type Tab = chrome.tabs.Tab;
export type QueryInfo = chrome.tabs.QueryInfo;

