import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import TabGridItem from "./TabGridItem";

const TabGrid = ({ tabs }: { tabs: Tab[] }) => {

  return (
    <GridContainer>
      { tabs.map(tab => <TabGridItem tab={tab} key={tab.url} />)}
    </GridContainer>
  );
};

export default TabGrid;

const GridContainer = styled.div`
  width: 760px;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  gap: 10px;
  justify-items: center;
  justify-content: center;
`;
