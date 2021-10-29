import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { WindowTypes } from 'src/constants/types';
import { toggleActive } from 'src/store/modules/intefaceSlice';

export const useWindow = (windowType: WindowTypes) => {
  const { activeWindows } = useTypedSelector(state => state.interfaces);
  const dispatch = useTypedDispatch();

  const isActive = activeWindows.includes(windowType);  
  const hideWindow = () => { dispatch(toggleActive(windowType)) } 

  return { isActive, hideWindow };
};
