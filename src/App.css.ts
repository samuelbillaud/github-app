import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  height: '100%',
});

export const button = style({
  borderRadius: '8px',
  border: '1px solid transparent',
  padding: '0.6em 1.2em',
  fontSize: '1em',
  fontWeight: 500,
  fontFamily: 'inherit',
  backgroundColor: '#edede',
  cursor: 'pointer',
  transition: 'border-color 0.25s',

  selectors: {
    '&:hover': {
      borderColor: '#646cff',
    },
  },
});
