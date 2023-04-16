import { request } from './request';
import { GetPullRequest, GetPullRequests, GetRepository } from '../types';

export class GithubService {
  static getPullRequests(owner: string, repo: string) {
    return request<GetPullRequests>({
      url: `/repos/${owner}/${repo}/pulls`,
    });
  }

  static getPullRequest(owner: string, repo: string, pull_number: number) {
    return request<GetPullRequest>({
      url: `/repos/${owner}/${repo}/pulls/${pull_number}`,
    });
  }

  static getRepository(owner: string, repo: string) {
    return request<GetRepository>({
      url: `/repos/${owner}/${repo}`,
    });
  }
}
