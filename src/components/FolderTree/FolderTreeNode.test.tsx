import FolderListItem from './FolderTreeNode';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import dummyNode from 'src/dummy/bookmarks/node';
import store from 'src/store';
import { Provider } from 'react-redux';

describe('Directory List Item', () => {
  const onClickTitle = jest.fn();
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Provider store={store}>
        <FolderListItem node={dummyNode} handleClickTitle={() => onClickTitle} />
      </Provider>
    );
  });
  
  test('render node title', () => {
    const { getByText } = renderResult;    

    expect(getByText(dummyNode.title)).toBeInTheDocument();
  });

  test('calls onClickTitle prop when clicked title', () => {
    const { getByText } = renderResult;
    fireEvent.click(getByText(dummyNode.title));
    
    expect(onClickTitle).toBeCalledTimes(1);
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