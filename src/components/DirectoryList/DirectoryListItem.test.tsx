import DirectoryListItem from './DirectoryListItem';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import * as hooks from 'src/hooks';
import node from 'src/dummy/bookmarks/node';

const spySelector = jest.spyOn(hooks, 'useTypedSelector');
const useSpySelector = () => spySelector.mockReturnValue({
  bookmarks: { selectedDirId: '1' } 
});

describe('Directory List Item', () => {
  const onClickTitle = jest.fn();
  let renderResult: RenderResult;

  beforeEach(() => {
    useSpySelector();
    renderResult = render(
      <DirectoryListItem node={node} handleClickTitle={() => onClickTitle} />
    );
  });
  
  test('render node title', () => {
    const { getByText } = renderResult;    

    expect(getByText(node.title)).toBeInTheDocument();
  });

  test('calls onClickTitle prop when clicked title', () => {
    const { getByText } = renderResult;
    fireEvent.click(getByText(node.title));
    
    expect(onClickTitle).toBeCalledTimes(1);
  });

  
  test('opens drop-down list when clicked arrow', async () => {
    const { getByTitle, getByText } = renderResult;
    const arrow = getByTitle('하위 디렉토리 목록 보기')
    fireEvent.click(arrow);

    setTimeout(() => {
      for (const { title } of node.children) {
        expect(getByText(title)).toBeInTheDocument();
      }
    }, 0);
  });
});