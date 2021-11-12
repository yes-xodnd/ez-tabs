import { BookmarkBorder } from '@styled-icons/material-outlined';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { createFromTabs } from 'src/store/modules/bookmarksSlice';
import { clearCheck } from 'src/store/modules/tabsSlice';
import { openWindow, openWindowAlone } from 'src/store/modules/windowsSlice';
import styled from 'styled-components';

const ButtonAdd = () => {
  const disabled = useTypedSelector(state => !state.tabs.checkedTabIds.length);
  const isPopup = useTypedSelector(state => state.interfaces.isPopup);
  const dispatch = useTypedDispatch();

  const handleClick = () => { 
    if (disabled) return;
    
    dispatch(createFromTabs());
    dispatch(clearCheck());
    
    if (isPopup) dispatch(openWindow('BOOKMARKS'));
    else dispatch(openWindowAlone('BOOKMARKS'));
  };


  return (
    <Wrapper>
      <Button
      onClick={handleClick}
      disabled={disabled}
      >
      <BookmarkBorder size="16" />
      <div>북마크에 추가</div>
      </Button>
    </Wrapper>
  );
};

export default ButtonAdd;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  font-size: 1rem;
`;

const Button = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${
    ({ disabled, theme }) => disabled 
      ? 'darkgrey'
      : theme.colors.mainLight
  };
  color: white;

  &:hover {
    cursor: pointer;
    background-color: ${
      ({ disabled, theme }) => disabled 
        ? 'darkgrey' 
        : theme.colors.main
    };
  }
`;
