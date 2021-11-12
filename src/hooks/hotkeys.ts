import { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useRef } from "react";
import { throttle } from "src/util";

const isExceptionTag = (tagName: string): boolean => (
  ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)
);

export const useHotkeys = <T extends { [key: string]: () => void }>(keyHandlers: T) => {

  const executeHandler = useCallback((key: string) => {
    if (keyHandlers[key]) keyHandlers[key]()
  }, [ keyHandlers ]);

  const throttledInput = useRef(throttle((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const key = e.key;  
    
    if (target && target.tagName && isExceptionTag(target.tagName)) return;

    executeHandler(key);
    e.stopPropagation();
    
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