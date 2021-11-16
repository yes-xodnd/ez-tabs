import { KeyboardEvent as ReactKeyboardEvent, KeyboardEventHandler, useEffect, useMemo, useRef } from "react";
import { toggleWindow } from 'src/store/modules/windowsSlice';
import { once, throttle } from "src/util";
import { useTabsKeyHandlers, useTypedSelector } from ".";
import { useBookmarksKeyHandlers } from "./bookmarks";
import { useTypedDispatch } from "./redux";

type Handler = (e?: ReactKeyboardEvent) => void;
type HandlerMap = { [key: string]: Handler };

const isExceptionTag = (tagName: string): boolean => (
  ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)
);

const getKey = (e: ReactKeyboardEvent) => {
  let ctrl: string = e.ctrlKey ? 'Ctrl+' : '';
  let shift: string = e.shiftKey ? 'Shift+' : '';
  return ctrl + shift + e.key;
}

export const useHotkeys = <T extends HandlerMap>(keyHandlers: T) => {

  const handlerRef = useRef<HandlerMap>({});
  handlerRef.current = keyHandlers;

  const throttledInput = useRef(throttle((e: ReactKeyboardEvent) => {
    const target = e.target as HTMLElement;
    const key = getKey(e);
    
    if (target && target.tagName && isExceptionTag(target.tagName)) return;
    handlerRef.current[key] && handlerRef.current[key](e);
    
  }, 50));
   
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
    'PageUp': () => dispatch(toggleWindow()),
    'PageDown': () => dispatch(toggleWindow()),
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
  const global = useGlobalKeyHandlers();
  const tabs = useTabsKeyHandlers();
  const bookmarks = useBookmarksKeyHandlers();
  
  const current = windowType === 'TABS' ? tabs : bookmarks;

  return {
    ...global,
    ...current
  };
}