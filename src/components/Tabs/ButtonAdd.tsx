import Button from 'src/components/UI/Button';
import { AddCircleOutline } from '@styled-icons/material-outlined';
import { useContext } from 'react';
import { checkContext } from './TabListContainer';
import api from 'src/api';

const ButtonAdd = () => {
  const { checkedItems } = useContext(checkContext);

  const Icon = <AddCircleOutline size="16" />;
  const handleClick = () => {
    
  };

  return (
    <Button 
      icon={Icon}
      content={'북마크에 추가'}
      handleClick={handleClick}
      disabled={!checkedItems.length}
    />
  );
};

export default ButtonAdd;
