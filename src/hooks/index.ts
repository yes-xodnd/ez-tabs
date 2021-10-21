import { useState } from "react";
import useCheck from './useCheck';
import { useTypedDispatch, useTypedSelector } from './redux';

export const useToggle = (initValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initValue);
  const toggleState = () => setState(!state);
  return [state, toggleState];
}

export {
  useCheck,
  useTypedDispatch,
  useTypedSelector
};