import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from 'src/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<Dispatch>();


export const useToggle = (initValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initValue);
  const toggleState = () => setState(!state);
  return [state, toggleState];
}