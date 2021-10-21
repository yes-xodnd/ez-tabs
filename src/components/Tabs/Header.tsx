import styled from "styled-components";
import HeaderButton from 'src/components/HeaderButton';

const TabListHeader = () => {
  return (
    <Wrapper>
      <Title>탭 목록</Title>

      
    </Wrapper>
  );
};

export default TabListHeader;

const Wrapper = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 0.5rem 0;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;