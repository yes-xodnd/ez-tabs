import BookmarkItem from './BookmarkItem';
import { nodeDummy } from 'src/dummy/getTree';
import { render } from '@testing-library/react';

describe('BookmarkItem', () => {

  test('renders node title', () => {
    const { getByText } = render(<BookmarkItem node={nodeDummy} />);
    expect(getByText(nodeDummy.title)).toBeInTheDocument();
  })
})