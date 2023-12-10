import styled from 'styled-components';

export const BannerContainer = styled.div<{ $image?: string }>`
  height: 150px;
  background: lightgray;
  background: linear-gradient(
      90deg,
      #36231c 18.92%,
      rgba(54, 35, 28, 0) 50.56%,
      #36231c 80.88%
    ),
    url(${(p) => p.$image || ''});
  background-position: center;
  background-repeat: no-repeat;

  padding: 12.333px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 150px;
    max-width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    & {
      background: url(${(p) => p.$image || ''});
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;
