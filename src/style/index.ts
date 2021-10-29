import styled, { css } from 'styled-components';

export const WindowWrapper = styled.div`
  flex-grow: 2;
  max-width: 800px;
  padding: 1rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px lightgrey;
  overflow: hidden;
`;

export const customScroll = css`
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: royalblue;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 0.5rem;
  }
`;