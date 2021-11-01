import { GridView } from '@styled-icons/material-outlined';

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
export type WindowTypes = 'BOOKMARKS' | 'TABS' | 'SEARCH';

export type StyledIcon = typeof GridView;
export type ButtonTypes = 'NORMAL' | 'DANGER';