import { FC, ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getOwnerAndRepo, isGithubUrlFn } from '../../utils';
import { GithubService } from '../../api-client';
import { GetRepository } from '../../types';
import { Spinner } from '../Spinner';

import { pullRequestsLayoutContainer } from './PullRequestsLayout.css';

type PullRequestsLayoutProps = {
  url: string;
  children: ReactNode;
};

export const PullRequestsLayout: FC<PullRequestsLayoutProps> = ({ url, children }) => {
  const isGithubUrl = isGithubUrlFn(url);
  const [owner, repo] = getOwnerAndRepo(url);

  const { isLoading, isError } = useQuery<GetRepository, Error>(
    ['getRepository', url],
    () => GithubService.getRepository(owner, repo),
    {
      enabled: isGithubUrl,
      retry: false,
    }
  );

  if (!isGithubUrl) {
    return <div>This is the wrong url format</div>;
  }

  if (isError) {
    return <div>{"Repository doesn't exist"}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <div className={pullRequestsLayoutContainer}>{children}</div>;
};
