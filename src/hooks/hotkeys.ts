import { KeyboardEvent as ReactKeyboardEvent, KeyboardEventHandler, useEffect, useMemo, useRef } from "react";
import { toggleWindow } from 'src/store/modules/windowsSlice';
import { once, throttle } from "src/util";
import { useTabsKeyHandlers, useTypedSelector } from ".";
import { useBookmarksKeyHandlers } from "./bookmarks";
import { useTypedDispatch } from "./redux";

type Handler = (e?: ReactKeyboardEvent) => void;
type HandlerMap = { [command: string]: Handler };

const MODIFIER_KEYS = ['ALT', 'CTRL', 'SHIFT']
const EXCEPTION_TAGS = ['INPUT', 'TEXTAREA', 'SELECT']

const getCommand = ({ altKey, ctrlKey, shiftKey, key: keyInput }: ReactKeyboardEvent): string => {
  const key = keyInput.toUpperCase()

  if (MODIFIER_KEYS.includes(key)) return key;

  return [ altKey, ctrlKey, shiftKey ]
    .map((isPressed, i) => isPressed ? MODIFIER_KEYS[i] : '')
    .filter(key => key.length)
    .concat(key)
    .join('+');
}

const normalizeCommand = (command: string): string => {
  const keys = command
    .toUpperCase()
    .split('+');

  const modifiers = MODIFIER_KEYS
    .map(key => keys.includes(key) ? key : '')
    .filter(key => key.length);

  const nonModifiers = keys
    .filter(key => !MODIFIER_KEYS.includes(key));

  return modifiers
    .concat(nonModifiers)
    .join('+');
}

const normalizeHandlerMap = (handlerMap: HandlerMap) => {
  const result: HandlerMap = {};

  for (const command in handlerMap) {
    result[normalizeCommand(command)] = handlerMap[command];
  }
  return result;
}

export const useHotkeys = (handlerMap: HandlerMap): KeyboardEventHandler => {

  const handlerRef = useRef<HandlerMap>({});
  handlerRef.current = useMemo(() => normalizeHandlerMap(handlerMap), [ handlerMap ]);

  const handleKeyDownRef = useRef(throttle((e: ReactKeyboardEvent) => {
    const target = e.target as HTMLElement;
    const command = getCommand(e);
    
    if (target && target.tagName && EXCEPTION_TAGS.includes(target.tagName)) return;
    handlerRef.current[command] && handlerRef.current[command](e);
    
  }, 50));
   
  const handleKeyDown: KeyboardEventHandler = e => handleKeyDownRef.current(e);
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