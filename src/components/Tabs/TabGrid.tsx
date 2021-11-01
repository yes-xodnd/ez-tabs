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
  padding: 1.5rem 1rem;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 300px));
  column-gap: 1rem;
  row-gap: 1.2rem;
  justify-items: center;
  justify-content: center;
`;
