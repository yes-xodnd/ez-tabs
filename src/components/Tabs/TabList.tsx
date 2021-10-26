import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import Header from './Header';
import TabListItemContainer from './TabListItemContainer';
import ButtonAdd from './ButtonAdd';

interface Props {
  tabs: Tab[];
  addBookmarks: () => void;
}

const TabList = ({ tabs, addBookmarks }: Props) => {

  return (
    <Wrapper>
      <Header />
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
  min-width: 300px;
  width: 30%;
  max-width: 30%;
  border-radius: 1rem;
  padding: 1rem;
  background: white;
`;

const ListWrapper = styled.div`
  flex-grow: 2;
`;
