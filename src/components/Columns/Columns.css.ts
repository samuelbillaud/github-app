import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',

  gap: '20px',
  overflowY: 'hidden',
});

export const column = style({
  flex: '0 0 250px',
  maxHeight: '600px',
  overflowX: 'scroll',
  borderRadius: '10px',
});

export const pullRequestHeader = style({
  position: 'sticky',
  top: 0,
  padding: '10px',
});

export const pullRequest = style({
  padding: '10px',
  display: 'flex',
  background: '#fff',

  selectors: {
    '&:hover': {
      background: '#f1f1f1',
    },
  },
});

export const pullRequestName = style({
  fontWeight: 'bold',
});

globalStyle(`${pullRequestName} ~ div`, {
  color: '#9B9E9D',
  fontStyle: 'italic',
});
