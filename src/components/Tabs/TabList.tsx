import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import TabListItem from './TabListItem';

const TabList = ({ tabs }: { tabs: Tab[] }) => {

  return (
    <Wrapper>
      { tabs.map(tab => <TabListItem tab={tab} key={tab.url} />) }
    </Wrapper>
  );
};

export default TabList;

const Wrapper = styled.div`
  background-color: white;
`;