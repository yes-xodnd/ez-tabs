import styled from 'styled-components';

interface Props {
  url?: string;
  snatcher?: boolean;
  size?: string;
}


const Favicon = ({ url, snatcher, size = '16' }: Props) => {

  const getFavUrl = (url: string | undefined) => (!url || snatcher)
    ? `https://www.google.com/s2/favicons?domain=${url}`
    : url;

  return <Wrapper url={getFavUrl(url)} size={size} />
};

export default Favicon;

const Wrapper = styled.div<{ url: string, size: string }>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: none;
  max-width: ${props => props.size + 'px'};
  max-height: ${props => props.size + 'px'};
  width: 100%;
  height: 100%;
`;