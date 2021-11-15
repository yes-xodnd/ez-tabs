import { KeyboardEvent as ReactKeyboardEvent, KeyboardEventHandler, useEffect, useMemo, useRef } from "react";
import { toggleWindow } from 'src/store/modules/windowsSlice';
import { once, throttle } from "src/util";
import { useSearchKeyHandlers, useTabsKeyHandlers, useTypedSelector } from ".";
import { useTreeKeyHandlers } from "./bookmarks";
import { useTypedDispatch } from "./redux";

type Handler = (e?: ReactKeyboardEvent) => void;
type HandlerMap = { [key: string]: Handler };

const isExceptionTag = (tagName: string): boolean => (
  ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)
);

export const useHotkeys = <T extends HandlerMap>(keyHandlers: T) => {

  const handlerRef = useRef<HandlerMap>({});
  handlerRef.current = keyHandlers;

  const throttledInput = useRef(throttle((e: ReactKeyboardEvent) => {
    const target = e.target as HTMLElement;
    const key = e.key;  
    
    if (target && target.tagName && isExceptionTag(target.tagName)) return;
    handlerRef.current[key] && handlerRef.current[key](e);
    
  }, 100));
   
  const handleKeyDown: KeyboardEventHandler = e => throttledInput.current(e);

  return handleKeyDown;
}

export const useScrollCenterFocused = <T extends HTMLElement>(isFocused: boolean) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (isFocused) ref.current?.scrollIntoView?.({ block: 'center' });
  }, [ isFocused ]);

  return ref;
}

export const useGlobalKeyHandlers = () => {
  const dispatch = useTypedDispatch();

  return useMemo(() => ({
    PageDown: () => dispatch(toggleWindow())
  }), [ dispatch ]);
}

export const useGlobalHotkeys = once((handlers: HandlerMap) => {
  useEffect(() => {
    const handleKeyDown = throttle(({ key }: KeyboardEvent) => {
      handlers[key] && handlers[key]();
    }, 100);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [ handlers ]);
});

export const useCombinedKeyHandlers = () => {
  const windowType = useTypedSelector(state => state.interfaces.visibleWindow);
  const bookmarksView = useTypedSelector(state => state.bookmarks.view);

  const global = useGlobalKeyHandlers();
  const tabs = useTabsKeyHandlers();
  const tree = useTreeKeyHandlers();
  const search = useSearchKeyHandlers();
  
  const current = 
    windowType === 'TABS'    ? tabs :
    bookmarksView === 'TREE' ? tree :
    search;

  return {
    ...global,
    ...current
  };
}