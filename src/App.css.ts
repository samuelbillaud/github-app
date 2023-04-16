import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  height: '100%',
  padding: '50px',
});

export const title = style({
  marginBottom: '20px',
  fontSize: '40px',
  color: '#28abe1',
});

export const searchInput = style({
  width: '100%',
  height: '40px',
  margin: '20px 0',
  paddingLeft: '20px',
  border: '1px solid #000',
  borderRadius: '10px',
});
