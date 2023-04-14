import { Endpoints } from "@octokit/types";

import { request } from './request';

export type GetPullRequests = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];

export class GithubService {
  static getPullRequests(owner: string, repo: string) {
    const url = `/repos/${owner}/${repo}/pulls`;

    return request<GetPullRequests>({
      url,
    });
  }

  static getPullRequest(owner: string, repo: string, pull_number: number) {
    const url = `/repos/${owner}/${repo}/pulls/${pull_number}`;

    return request<Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data']>({
      url,
    });
  }
}
