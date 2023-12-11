import { useWebSettings } from '@/theme-provider';

export const CloseIcon = () => {
  const theme = useWebSettings();

  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='icon / chevron left' filter='url(#filter0_d_1397_696)'>
        <rect
          x='2'
          width='28'
          height='28'
          rx='14'
          fill='white'
          shapeRendering='crispEdges'
        />
        <path
          id='Path'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21.7338 8.27531C21.3788 7.92036 20.8055 7.92036 20.4505 8.27531L16 12.7167L11.5495 8.26621C11.1945 7.91126 10.6212 7.91126 10.2662 8.26621C9.91126 8.62116 9.91126 9.19454 10.2662 9.54949L14.7167 14L10.2662 18.4505C9.91126 18.8055 9.91126 19.3788 10.2662 19.7338C10.6212 20.0887 11.1945 20.0887 11.5495 19.7338L16 15.2833L20.4505 19.7338C20.8055 20.0887 21.3788 20.0887 21.7338 19.7338C22.0887 19.3788 22.0887 18.8055 21.7338 18.4505L17.2833 14L21.7338 9.54949C22.0796 9.20364 22.0796 8.62116 21.7338 8.27531Z'
          fill={theme?.primaryColour}
        />
      </g>
      <defs>
        <filter
          id='filter0_d_1397_696'
          x='0'
          y='0'
          width='32'
          height='32'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='1' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_1397_696'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_1397_696'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
