import { BookmarkBorder } from '@styled-icons/material-outlined';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { createFromTabs } from 'src/store/modules/bookmarksSlice';
import { clear } from 'src/store/modules/tabsSlice';
import styled from 'styled-components';

const ButtonAdd = () => {
  const { checkedTabIds } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();

  const disabled = !checkedTabIds.length;

  const handleClick = () => { 
    if (disabled) return;
    
    dispatch(createFromTabs());
    dispatch(clear());
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
