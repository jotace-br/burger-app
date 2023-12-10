interface MinusIconProps {
  bgColor?: string;
  minusIconColor?: string;
}

export const MinusIcon = ({
  bgColor = '#DADADA',
  minusIconColor = '#5F5F5F',
}: MinusIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='33'
    height='33'
    viewBox='0 0 33 33'
    fill='none'
  >
    <path
      d='M31.5 16.9551C31.5 25.2394 24.7843 31.9551 16.5 31.9551C8.21573 31.9551 1.5 25.2394 1.5 16.9551C1.5 8.67081 8.21573 1.95508 16.5 1.95508C24.7843 1.95508 31.5 8.67081 31.5 16.9551Z'
      fill={bgColor}
      stroke={bgColor}
      strokeWidth='2'
    />
    <rect
      x='7.5'
      y='15.4551'
      width='18'
      height='3'
      rx='1.5'
      fill={minusIconColor}
    />
  </svg>
);
