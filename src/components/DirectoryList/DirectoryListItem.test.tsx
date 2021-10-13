import DirectoryListItem from './DirectoryListItem';
import { dummyNode as node } from 'src/dummy/getTree';
import { render, fireEvent } from '@testing-library/react';
import { MouseEventHandler } from 'react';

describe('Directory List Item', () => {
  const renderItem = (handleClick: MouseEventHandler = () => {}) => render(
    <DirectoryListItem node={node} onClickTitle={handleClick} />
  );
  
  test('render node title', () => {
    const { getByText } = renderItem();
    expect(getByText(node.title)).toBeInTheDocument();
  });

  test('render children nodes', () => {
    const { getByText } = renderItem();

    for (const { title } of node.children) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });

  test('calss onClickTitle prop when clicked title', () => {
    const handleClick = jest.fn();
    const { getByText } = renderItem();
    fireEvent.click(getByText(node.title));
    expect(handleClick).toBeCalledTimes(1);
  })
});