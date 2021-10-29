import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import TabListItemContainer from './TabListItemContainer';
import ButtonAdd from './ButtonAdd';
import { customScroll } from 'src/style';

interface Props {
  tabs: Tab[];
  addBookmarks: () => void;
}

const TabList = ({ tabs, addBookmarks }: Props) => {

  return (
    <Wrapper>
      <ListWrapper>
        { tabs.map(tab => <TabListItemContainer tab={tab} key={tab.url} />) }
      </ListWrapper>
      <div>
        <ButtonAdd addBookmarks={addBookmarks} />
      </div>
    </Wrapper>
  );
};

export default TabList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 2;
`;

const ListWrapper = styled.div`
  ${ customScroll }

  flex-grow: 2;
  overflow-y: scroll;
`;
