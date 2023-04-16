import { useCallback } from 'react';

import { formatColumns } from '../utils';
import { Columns } from '../types';
import { useGetPullRequests } from './useGetPullRequests';

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
