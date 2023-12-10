import styled from 'styled-components';

// TODO: Transform this into a generic button for future use
export const Button = styled.button<{ $bgColor?: string }>`
  height: 48px;
  background: ${(p) => p.$bgColor || '#4f372f'};
  transition: 0.3s background-color ease-in-out;

  padding: 4px 24px;
  border-radius: 40px;

  font-size: 16px;
  font-weight: 500;

  color: #fff;
  border: none;

  cursor: pointer;

  &:hover {
    background-color: #3f2c25;
  }
  &:disabled {
    background-color: #dadada;
    cursor: not-allowed;
  }
`;
