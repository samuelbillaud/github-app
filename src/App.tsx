import { ChangeEvent, useState } from 'react';

import { Columns, NextPRToReview, PullRequestsLayout } from './components';
import { useDebounce } from './hooks';
import { container, title, searchInput } from './App.css';

function App() {
  const [url, setUrl] = useState('https://github.com/facebook/react');

  const debouncedUrl = useDebounce<string>(url, 1000);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setUrl(value);
  };

  return (
    <div className={container}>
      <h1 className={title}>Mergic 🪄</h1>
      <input type="text" onChange={onChange} placeholder="Enter repo url" defaultValue={url} className={searchInput} />

      <PullRequestsLayout url={debouncedUrl}>
        <>
          <NextPRToReview url={debouncedUrl} />
          <Columns url={debouncedUrl} />
        </>
      </PullRequestsLayout>
    </div>
  );
}

export default App;
