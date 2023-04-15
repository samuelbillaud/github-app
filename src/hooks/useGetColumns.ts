import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GithubService } from '../api-client';
import { isGithubUrlFn, formatColumns } from '../utils';
import { Columns, GetPullRequests } from '../types';

export const useGetPullRequests = (url: string) => {
  const isGithubUrl = isGithubUrlFn(url);
  const [owner, repo] = isGithubUrl ? url.split('/').slice(-2) : [];

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

type UseGetColumns = (url: string) => {
  isLoading: boolean;
  columns: Columns;
  error: Error | null;
};

export const useGetColumns: UseGetColumns = (url) => {
  const { pullRequests, isLoading, error } = useGetPullRequests(url);

  const getColumns = useCallback(formatColumns, [pullRequests]);

  return {
    isLoading,
    columns: pullRequests ? getColumns(pullRequests) : {},
    error,
  };
};
