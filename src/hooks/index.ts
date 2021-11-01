import { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from './redux';
import { useFolderOpen, useCurrentFolder } from './FolderTree';
import { useIsActiveWindow } from './Windows';

const useToggle = (initState: boolean): [ boolean, () => void ] => {
  const [ state, setState ] = useState(initState);
  return [ state, () => setState(!state) ];
}


export {
  useToggle,
  useTypedDispatch,
  useTypedSelector,
  useFolderOpen,
  useCurrentFolder,
  useIsActiveWindow,
};