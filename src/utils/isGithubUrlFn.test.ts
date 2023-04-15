import { isGithubUrlFn } from './isGithubUrlFn';

describe('isGithubUrlFn', () => {
  it('should be true if url params is an github url regex match', () => {
    expect(isGithubUrlFn('https://github.com/python/cpython')).toBeTruthy();
  });

  it('should be false if url params is not an github url regex match', () => {
    expect(isGithubUrlFn('https://vitest.dev/')).toBeFalsy();
  });
});
