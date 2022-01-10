import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

export { LoaderContainer };

const LoaderSimbol = () => {
  return (
    <LoaderContainer>
      <Loader type="Grid" color="#00BFFF" height={80} width={80} timeout={1000} />
    </LoaderContainer>
  );
};

export default LoaderSimbol;
