import styled from 'styled-components';
import { Grid } from 'react-loader-spinner';

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
      <Grid color="#00BFFF" height={80} width={80} />
    </LoaderContainer>
  );
};

export default LoaderSimbol;
