import { StyledIcon } from 'src/constants/types';
import styled from 'styled-components';

interface Props {
  title: string;
  handleClick: () => void;
  Icon: StyledIcon;
}

const ToolbarButton = ({ title, handleClick, Icon }: Props) => {
  return (
    <Wrapper title={title} onClick={handleClick}>
      <Icon size="20" />
      <div>{ title }</div>
    </Wrapper>
  );
};

export default ToolbarButton;

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 0.8rem;
  background-color: white;
  color: #333333;
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.main};
    color: white;
  }  
`