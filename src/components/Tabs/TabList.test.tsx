import { render } from "@testing-library/react";
import TabList from "./TabList";
import queryResult from 'src/dummy/tabs/queryResult';
import api from 'src/api';

describe('TabList', () => {
  test('render tabs', () => {
    const { getByText } = render(<TabList tabs={queryResult} />);
    const titleList = queryResult.map(({ title }) => title as string);
    
    for (const title of titleList) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });

  test('re-render tabs when removed', async () => {
    const { queryByText } = render(<TabList tabs={queryResult} />);
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