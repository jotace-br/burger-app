import styled from 'styled-components';

export const BtnQuantity = styled.button<{
  $width?: string;
  $height?: string;
}>`
  width: ${(p) => p.$width || '32px'};
  height: ${(p) => p.$height || '32px'};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;
