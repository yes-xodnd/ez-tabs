import styled, { css } from 'styled-components';

export const WindowWrapper = styled.div`
  flex-grow: 2;
  min-width: 400px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;
`;

export const customScroll = css`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;

    &:hover {
      background-color: royalblue;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 5px 1rem;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 2px 2px #efefef;
  z-index: 2;
`;

export const ToolbarButton = styled.button`
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
    background: royalblue;
    color: white;
  }  
`