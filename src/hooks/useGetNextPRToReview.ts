import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { GithubService } from '../api-client';
import { getOwnerAndRepo, isGithubUrlFn, getNextPRToReview } from '../utils';

import { useGetPullRequests } from './useGetPullRequests';
import { GetPullRequest, GetPullRequests, PullRequestWithScore } from '../types';

const useGetPullRequestsDetails = (pullRequests: GetPullRequests, url: string) => {
  const queryClient = useQueryClient();

  const [owner, repo] = getOwnerAndRepo(url);

  return useCallback(async () => {
    try {
      const pullRequestQueries = await Promise.all(
        pullRequests.map(async ({ number }) => {
          const pull = await queryClient.fetchQuery<GetPullRequest>({
            queryKey: ['getPullRequest', number],
            queryFn: () => GithubService.getPullRequest(owner, repo, number),
          });
          return pull;
        })
      );

      return pullRequestQueries;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [pullRequests, queryClient, owner, repo]);
};

export const useGetNextPRToReview = (
  url: string
): { isLoading: boolean; nextPRToReview: PullRequestWithScore | null } => {
  const [nextPRToReview, setNextPRToReview] = useState<PullRequestWithScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { pullRequests } = useGetPullRequests(url);
  const getPullRequestsDetails = useGetPullRequestsDetails(pullRequests || [], url);

  const isGithubUrl = isGithubUrlFn(url);

  useEffect(() => {
    const fetchData = async () => {
      if (!isGithubUrl) {
        return;
      }

      setIsLoading(true);

      try {
        const pullRequestQueries = await getPullRequestsDetails();

        setNextPRToReview(getNextPRToReview(pullRequestQueries));
      } catch (error) {
        console.error(error);

        setNextPRToReview(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pullRequests, isGithubUrl]);

  return {
    isLoading,
    nextPRToReview,
  };
};
