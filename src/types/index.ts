import { Endpoints } from '@octokit/types';

export type GetPullRequests = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];
export type GetPullRequest = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data'];

export type Columns = {
  [key: string]: {
    id: number;
    name: string;
    isDefault: boolean;
    color: string;
    pullRequests: GetPullRequests;
  };
};
