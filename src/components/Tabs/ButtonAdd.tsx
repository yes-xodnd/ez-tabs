import { AddCircleOutline } from '@styled-icons/material-outlined';
import { useContext } from 'react';
import { checkContext } from './TabListContainer';
import Button from 'src/components/UI/Button';

const ButtonAdd = ({ addBookmarks }: { addBookmarks: () => void }) => {
  const { checkedItems } = useContext(checkContext);
  const Icon = <AddCircleOutline size="16" />;
  const disabled = !checkedItems.length;

  return (
    <Button 
      icon={Icon}
      content={'북마크에 추가'}
      handleClick={addBookmarks}
      disabled={disabled}
    />
  );
};

export default ButtonAdd;
