const GITHUB_REGEX_PATTERN = /^(https?:\/\/)?(github.com)\/([a-z_-]+)\/([a-z]+)/;

export const isGithubUrlFn = (url: string) => GITHUB_REGEX_PATTERN.test(url);
