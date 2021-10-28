import styled from 'styled-components';

interface Props {
  url?: string;
  snatcher?: boolean;
}


const Favicon = ({ url, snatcher }: Props) => {

  const getFavUrl = (url: string | undefined) => (!url || snatcher)
    ? `https://www.google.com/s2/favicons?domain=${url}`
    : url;

  return <Wrapper url={getFavUrl(url)} />
};

export default Favicon;

const Wrapper = styled.div<{ url: string }>`
  background-image: url(${props => props.url});
  background-size: contain;
  max-width: 16px;
  max-height: 16px;
  width: 100%;
  height: 100%;
`;