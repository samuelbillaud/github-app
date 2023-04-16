import { keyframes, style } from '@vanilla-extract/css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinnerContainer = style({
  display: 'flex',
  alignContent: 'center',
  minHeight: '40px',
});

export const loadingSpinner = style({
  width: '30px',
  height: '30px',
  margin: '20px',
  border: '2px solid #f3f3f3',
  borderTop: '2px solid #383636',
  borderRadius: '50%',
  animation: `${rotate} 1.5s linear infinite`,
});
