import { FC } from 'react';
import { useGetNextPRToReview } from '../../hooks/useGetNextPRToReview';

type NextPRToReviewProps = {
  url: string;
};

export const NextPRToReview: FC<NextPRToReviewProps> = ({ url }) => {
  const { nextPRToReview, isLoading } = useGetNextPRToReview(url);

  return isLoading ? <div>Loading</div> : <div>Next PR to Review : {nextPRToReview.title}</div>;
};
