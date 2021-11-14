import ToolbarButton from 'src/components/UI/ToolbarButton';
import { ViewList } from '@styled-icons/material-outlined';
import { useTypedDispatch } from 'src/hooks';
import { showAllNodeList } from 'src/store/modules/searchSlice';
import { useMemo } from 'react';
import { setView } from 'src/store/modules/bookmarksSlice';


const ButtonShowAll = () => {
  const dispatch = useTypedDispatch();

  const buttonProps: React.ComponentProps<typeof ToolbarButton> = useMemo(() => ({
    title: '전체 목록',
    handleClick: () => {
      dispatch(showAllNodeList());
      dispatch(setView('SEARCH'));
    },
    Icon: ViewList
  }), [ dispatch ]);

  return (
    <ToolbarButton { ...buttonProps } />
  )
  
};

export default ButtonShowAll;