import BookmarkItem from './BookmarkItem';
import { dummyNode as node } from 'src/dummy/getTree';
import { render } from '@testing-library/react';

describe('BookmarkItem', () => {
  
  test('render node title', () => {
    const { getByText } = render(<BookmarkItem node={node} />);
    expect(getByText(node.title)).toBeInTheDocument();
  });

  test('render children nodes', () => {
    const { getByText } = render(<BookmarkItem node={node} />);

    for (const { title } of node.children) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });
});