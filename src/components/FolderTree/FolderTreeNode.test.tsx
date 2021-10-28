import FolderListNode from './FolderTreeNode';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import dummyNode from 'src/dummy/bookmarks/node';
import store from 'src/store';
import { Provider } from 'react-redux';

describe('Directory List Item', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Provider store={store}>
        <FolderListNode node={dummyNode} />
      </Provider>
    );
  });
  
  test('render node title', () => {
    const { getByText } = renderResult;    

    expect(getByText(dummyNode.title)).toBeInTheDocument();
  });
  
  test('opens drop-down list when clicked arrow', async () => {
    const { getByTitle, getByText } = renderResult;
    const arrow = getByTitle(/하위 디렉토리 목록 보기/g);
    fireEvent.click(arrow);

    setTimeout(() => {
      for (const { title } of dummyNode.children) {
        expect(getByText(title)).toBeInTheDocument();
      }
    }, 0);
  });
});