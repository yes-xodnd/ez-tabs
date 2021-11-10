import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import TabListItem from './TabListItem';

const TabList = ({ tabs }: { tabs: Tab[] }) => {

  return (
    <Wrapper>
      { 
        tabs.map((tab, index) => (
          <TabListItem 
            tab={tab} 
            key={tab.url}
            index={index}
            />
        )) 
      }
    </Wrapper>
  );
};

export default TabList;

const Wrapper = styled.div`
  background-color: white;
`;