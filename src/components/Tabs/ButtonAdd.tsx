import { AddCircleOutline } from '@styled-icons/material-outlined';
import Button from 'src/components/UI/Button';
import { useTypedSelector } from 'src/hooks';

const ButtonAdd = ({ addBookmarks }: { addBookmarks: () => void }) => {
  const { checkedTabIds } = useTypedSelector(state => state.tabs);
  const Icon = <AddCircleOutline size="16" />;
  const disabled = !checkedTabIds.length;

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
