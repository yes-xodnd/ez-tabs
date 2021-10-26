import styled from "styled-components";

const TabListHeader = () => {
  return (
    <Wrapper>
      <Title>탭 목록</Title>  
    </Wrapper>
  );
};

export default TabListHeader;

const Wrapper = styled.div`
  margin: 0.5rem 0;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;