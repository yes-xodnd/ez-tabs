import { ToolbarButton as Wrapper } from 'src/style';
import { StyledIcon } from 'src/constants/types';

interface Props {
  title: string;
  handleClick: () => void;
  Icon: StyledIcon;
}

const ToolbarButton = ({ title, handleClick, Icon }: Props) => {
  return (
    <Wrapper title={title} onClick={handleClick}>
      <Icon size="20" />
    </Wrapper>
  );
};

export default ToolbarButton;