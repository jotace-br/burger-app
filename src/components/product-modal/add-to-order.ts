import styled from 'styled-components';

// TODO: Transform this into a generic button for future use
export const BtnAddToOrder = styled.button<{ $bgColor?: string }>`
  color: #fff;
  border: none;
  cursor: pointer;

  height: 48px;
  padding: 4px 24px;

  border-radius: 40px;
  background: ${(p) => p.$bgColor || '#4f372f'};

  font-size: 16px;
  font-weight: 500;

  transition: 0.3s background-color ease-in-out;

  &:hover {
    background-color: #3f2c25;
  }

  &:disabled {
    background-color: #dadada;
    cursor: not-allowed;
  }
`;
