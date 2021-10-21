import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import Header from './Header';
import TabListItem from './TabListItem';

interface Props {
  tabs: Tab[];
}

const TabList = ({ tabs }: Props) => {

  return (
    <Wrapper>
      <Header />
      { tabs.map(tab => <TabListItem tab={tab} key={tab.url} />) }
    </Wrapper>
  );
};

export default TabList;

const Wrapper = styled.div`
  min-width: 300px;
  width: 30%;
  max-width: 30%;
  border-radius: 1rem;
  padding: 1rem;
  background: white;
`;
