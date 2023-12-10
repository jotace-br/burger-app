interface PlusIconProps {
  bgColor?: string;
}

export const PlusIcon = ({ bgColor = '#4F372F' }: PlusIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='33'
    height='32'
    viewBox='0 0 33 32'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.5 32C25.3366 32 32.5 24.8366 32.5 16C32.5 7.16344 25.3366 0 16.5 0C7.66344 0 0.5 7.16344 0.5 16C0.5 24.8366 7.66344 32 16.5 32Z'
      fill={bgColor}
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15 23.5C15 24.3284 15.6716 25 16.5 25C17.3284 25 18 24.3284 18 23.5V17.5H24C24.8284 17.5 25.5 16.8284 25.5 16C25.5 15.1716 24.8284 14.5 24 14.5H18V8.5C18 7.67157 17.3284 7 16.5 7C15.6716 7 15 7.67157 15 8.5V14.5H9C8.17157 14.5 7.5 15.1716 7.5 16C7.5 16.8284 8.17157 17.5 9 17.5H15V23.5Z'
      fill='white'
    />
  </svg>
);
