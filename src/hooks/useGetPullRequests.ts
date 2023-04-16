import { useQuery } from '@tanstack/react-query';
import { GithubService } from '../api-client';
import { getOwnerAndRepo, isGithubUrlFn } from '../utils';
import { GetPullRequests } from '../types';

export const useGetPullRequests = (url: string) => {
  const isGithubUrl = isGithubUrlFn(url);
  const [owner, repo] = getOwnerAndRepo(url);

  const { data, isLoading, error } = useQuery<GetPullRequests, Error>(
    ['getPullRequests', url],
    () => GithubService.getPullRequests(owner, repo),
    {
      enabled: isGithubUrl,
      keepPreviousData: true,
      retry: false,
    }
  );

  return { pullRequests: data, isLoading, error };
};
