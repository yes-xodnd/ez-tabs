import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '.';
import { selectCurrentFolderNode } from 'src/store/modules/bookmarksSlice';
import { setNodeList } from 'src/store/modules/nodeListSlice';

export const useCurrentFolderNode = () => {
  const dispatch = useTypedDispatch();
  const currentFolderNode = useTypedSelector(selectCurrentFolderNode);
  const view = useTypedSelector(state => state.bookmarks.view);

  useEffect(() => {
    dispatch(setNodeList(currentFolderNode.children || []));
  }, [ currentFolderNode, view, dispatch ]);

  return currentFolderNode;
}