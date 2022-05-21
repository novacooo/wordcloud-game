import styled, { keyframes } from 'styled-components';

const spinnerKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-width: 0.4rem;
  border-style: solid;
  border-color: ${({ theme }) => `${theme.color.accent} transparent`};
  border-radius: 50%;
  animation: ${spinnerKeyframes} 0.5s linear infinite;
`;

export default Spinner;
