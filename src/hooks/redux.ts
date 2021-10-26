import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from 'src/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<Dispatch>();