import { styled } from 'styled-components';

const ArrowIcon = styled.span`
  display: inline-block;
  border: solid #888888;
  border-width: 0 2px 2px 0;
  height: 5px;
  width: 5px;
`;

export const ArrowDown = styled(ArrowIcon)`
  transform: rotate(45deg);
`;

export const ArrowUp = styled(ArrowIcon)`
  transform: rotate(-135deg);
`;
