import { render, RenderResult } from "@testing-library/react";
import TabList from "./TabList";
import queryResult from 'src/dummy/tabs/queryResult';
import api from 'src/api';

let renderResult: RenderResult;

beforeEach(() => {
  renderResult = render(<TabList tabs={queryResult} />);
})

describe('TabList', () => {
  test('render tabs', () => {
    const { getByText } = renderResult;
    const titleList = queryResult.map(({ title }) => title as string);
    
    for (const title of titleList) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });

  test('re-render tabs when removed', async () => {
    const { queryByText } = renderResult;
    const { id, title } = queryResult[0];

    const target = queryByText(title as string);
    expect(target).toBeInTheDocument();
    
    await api.tabs.remove(id as number);
    setTimeout(() => {
      const target = queryByText(title as string);
      expect(target).toBeNull();
    }, 0);

  });
});