import { ChangeEvent, FC, ReactNode, useState } from 'react';

import { Columns, NextPRToReview } from './components';
import { container } from './App.css';
import { useQuery } from '@tanstack/react-query';
import { getOwnerAndRepo, isGithubUrlFn } from './utils';
import { GithubService } from './api-client';
import { GetRepository } from './types';

type PullRequestsLayoutProps = {
  url: string;
  children: ReactNode;
};

const PullRequestsLayout: FC<PullRequestsLayoutProps> = ({ url, children }) => {
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
    return <div>Loading</div>;
  }

  return <div style={{ width: '100%' }}>{children}</div>;
};

function App() {
  const [url, setUrl] = useState('https://github.com/facebook/react');

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setUrl(value);
  };

  return (
    <div className={container}>
      <div>Mergic</div>
      <input type="text" onBlur={onBlur} placeholder="Enter repo url" defaultValue={url} />

      <PullRequestsLayout url={url}>
        <>
          <NextPRToReview url={url} />
          <Columns url={url} />
        </>
      </PullRequestsLayout>
    </div>
  );
}

export default App;
