import { isGithubUrlFn } from './isGithubUrlFn';

export const getOwnerAndRepo = (url: string) => {
  const isGithubUrl = isGithubUrlFn(url);
  const [owner, repo] = isGithubUrl ? url.split('/').slice(-2) : [];

  return [owner, repo];
};
