import { globalStyle } from '@vanilla-extract/css';

/*
  1. Use a more-intuitive box-sizing model.
*/
globalStyle(`*, *::before, *::after`, {
  boxSizing: `border-box`,
});
/*
  2. Remove default margin
*/
globalStyle(`*`, {
  margin: 0,
  padding: 0,
});
/*
  3. Allow percentage-based heights in the application
*/
globalStyle(`html, body, #root`, {
  height: '100%',
});
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
});
/*
  6. Improve media defaults
*/
globalStyle(`img, picture, video, canvas, svg`, {
  display: 'block',
  maxWidth: '100%',
});
/*
  7. Remove built-in form typography styles
*/
globalStyle(`input, button, textarea, select`, {
  font: 'inherit',
});
/*
  8. Avoid text overflows
*/
globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: 'break-word',
});
/*
  9. Create a root stacking context
*/
globalStyle(`#root, #__next`, {
  isolation: 'isolate',
});
