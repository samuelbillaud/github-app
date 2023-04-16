import { useEffect, useState } from 'react';
import { getOwnerAndRepo, isGithubUrlFn } from '../utils';
import { useGetPullRequests } from './useGetPullRequests';
import { GithubService } from '../api-client';
import { useQueryClient } from '@tanstack/react-query';

const getScore = (pullRequest) => {
  const { title, html_url, created_at, user, labels, mergeable, draft, additions, deletions } = pullRequest || {};
  let score = 0;

  const hasUrgentLabel = (labels || []).some(({ name }) => name === 'URGENT');

  const linesChanges = additions + deletions;

  if (hasUrgentLabel) {
    score += 10;
  }

  // By name

  if (!mergeable) {
    score -= 2;
  }
  if (linesChanges < 100) {
    score += 1;
  }
  if (draft) {
    score -= 5;
  }

  return score;
};

export const useGetNextPRToReview = (url: string) => {
  const [pullRequestQueries, setPullRequestQueries] = useState<any>([]);
  const { pullRequests } = useGetPullRequests(url);

  const [owner, repo] = getOwnerAndRepo(url);
  const isGithubUrl = isGithubUrlFn(url);

  const queryClient = useQueryClient();

  const getPullRequests = async () => {
    const result = Promise.all(
      (pullRequests || []).map(async ({ number }) => {
        const pull = await queryClient.fetchQuery({
          queryKey: ['getPullRequest', number],
          queryFn: () => GithubService.getPullRequest(owner, repo, number),
        });

        return pull;
      })
    );

    try {
      const pullRequestQueries = await result;

      return pullRequestQueries;
    } catch (error) {
      console.error(error);

      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const pullRequestQueries = await getPullRequests();

      setPullRequestQueries(pullRequestQueries);
    };

    isGithubUrl && fetchData();
  }, [url, pullRequests]);

  const result = pullRequestQueries.map((data) => {
    const { title, html_url: htmlURL, created_at: createdAt, user } = data || {};

    return {
      title,
      htmlURL,
      createdAt,
      login: user?.login,
      score: getScore(data),
    };
  });

  const nextPRToReview = result.reduce(
    (previous, current) => (previous.score > current.score ? previous : current),
    result[0]
  );

  return {
    isLoading: !nextPRToReview,
    nextPRToReview,
  };
};
