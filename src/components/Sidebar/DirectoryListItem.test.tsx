import DirectoryListItem from './DirectoryListItem';
import { dummyNode as node } from 'src/dummy/getTree';
import { render } from '@testing-library/react';

describe('Directory List Item', () => {
  
  test('render node title', () => {
    const { getByText } = render(<DirectoryListItem node={node} />);
    expect(getByText(node.title)).toBeInTheDocument();
  });

  test('render children nodes', () => {
    const { getByText } = render(<DirectoryListItem node={node} />);

    for (const { title } of node.children) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });
});