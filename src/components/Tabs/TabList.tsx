import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import TabListItemContainer from './TabListItemContainer';
import { customScroll } from 'src/style';

interface Props {
  tabs: Tab[];
}

const TabList = ({ tabs }: Props) => {

  return (
    <Wrapper>
      <div>
        { tabs.map(tab => <TabListItemContainer tab={tab} key={tab.url} />) }
      </div>
    </Wrapper>
  );
};

export default TabList;

const Wrapper = styled.div`
  ${ customScroll }

  flex-grow: 2;
  padding: 1rem;

  overflow-y: auto;
`;