import { StyledIcon } from 'src/constants/types';
import styled from 'styled-components';

interface Props {
  title: string;
  Icon: StyledIcon;
  handleClick: () => void;
  disabled?: boolean;
}

const ToolbarButton = ({ title, handleClick, Icon, disabled = false }: Props) => {
  return (
    <Wrapper 
      title={title} 
      onClick={() => !disabled && handleClick()}
      disabled={disabled}
      >
      <Icon size="16" />
      {/* <div>{ title }</div> */}
    </Wrapper>
  );
};

export default ToolbarButton;

export const Wrapper = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 0.8rem;
  background-color: white;
  color: #333333;

  ${props => props.disabled
  ? 'background-color: #efefef;'
  : `
    &:hover {
      cursor: pointer;
      background-color: ${props.theme.colors.main};
      color: white;
    } 
  `
  }
`