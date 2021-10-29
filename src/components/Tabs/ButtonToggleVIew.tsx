import { GridView, ViewList } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';

interface Props {
  isListView: boolean;
  toggleView: () => void;
}

const ButtonToggleView = ({ isListView, toggleView }: Props) => {
  return (
    <ToolbarButton 
      title={isListView ? '그리드로 보기' : '리스트로 보기'}
      handleClick={ toggleView }
      Icon={isListView ? GridView : ViewList}
      />
  );
};

export default ButtonToggleView;