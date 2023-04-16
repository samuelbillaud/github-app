import { FC } from 'react';
import { useGetNextPRToReview } from '../../hooks';
import { Spinner } from '../Spinner';

import { nextPRToReviewContainer } from './NextPRToReview.css';

type NextPRToReviewProps = {
  url: string;
};

export const NextPRToReview: FC<NextPRToReviewProps> = ({ url }) => {
  const { nextPRToReview, isLoading } = useGetNextPRToReview(url);

  if (isLoading) {
    return <Spinner />;
  }

  return nextPRToReview ? (
    <div className={nextPRToReviewContainer}>Next PR to Review : {nextPRToReview.title}</div>
  ) : null;
};
