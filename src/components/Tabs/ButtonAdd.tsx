import { AddCircleOutline } from '@styled-icons/material-outlined';
import Button from 'src/components/UI/Button';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { createFromTabs } from 'src/store/modules/bookmarksSlice';
import { clear } from 'src/store/modules/tabsSlice';
import styled from 'styled-components';

const ButtonAdd = () => {
  const { checkedTabIds } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();
  const addBookmarks = () => { 
    dispatch(createFromTabs());
    dispatch(clear());
  }

  const Icon = <AddCircleOutline size="16" />;
  const disabled = !checkedTabIds.length;

  return (
    <Wrapper>
      <Button 
        icon={Icon}
        content={'북마크에 추가'}
        handleClick={addBookmarks}
        disabled={disabled}
      />
    </Wrapper>
  );
};

export default ButtonAdd;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 1rem;
`;
