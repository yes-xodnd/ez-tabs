import { useTypedSelector } from 'src/hooks';
import { WindowTypes } from 'src/constants/types';

export const useIsVisibleWindow = () => {
  const { visibleWindows } = useTypedSelector(state => state.interfaces);

  return (windowType: WindowTypes) => visibleWindows.includes(windowType);
};