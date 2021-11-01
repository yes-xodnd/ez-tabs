import { useTypedSelector } from 'src/hooks';
import { WindowTypes } from 'src/constants/types';

export const useIsActiveWindow = () => {
  const { activeWindows } = useTypedSelector(state => state.interfaces);

  return (windowType: WindowTypes) => activeWindows.includes(windowType);
};