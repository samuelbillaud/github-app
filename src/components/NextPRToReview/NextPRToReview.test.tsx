import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { NextPRToReview } from './NextPRToReview';
import { useGetNextPRToReview } from '../../hooks';

const queryClient = new QueryClient();

const NextPRToReviewWithProvider: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextPRToReview url="https://github.com/facebook/react" />
    </QueryClientProvider>
  );
};

vi.mock('../../hooks', () => ({
  useGetNextPRToReview: vi.fn(),
}));

describe('NextPRToReview component', () => {
  it('should display the next PR to review', () => {
    (useGetNextPRToReview as any).mockImplementation(() => ({
      nextPRToReview: {
        title: 'Mock PR Title',
        htmlURL: '',
        createdAt: '',
        score: 0,
      },
      isLoading: false,
    }));

    render(<NextPRToReviewWithProvider />);

    expect(screen.getByText(/Next PR to Review :/i)).toBeInTheDocument();

    expect(screen.getByText(/Mock PR Title/i)).toBeInTheDocument();
  });

  it('should display loading text while loading', () => {
    (useGetNextPRToReview as any).mockImplementation(() => ({
      nextPRToReview: null,
      isLoading: true,
    }));

    render(<NextPRToReviewWithProvider />);

    const loadingText = screen.getByText(/Loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('should not display anything if there is no next PR to review', () => {
    (useGetNextPRToReview as any).mockImplementation(() => ({
      nextPRToReview: null,
      isLoading: false,
    }));

    render(<NextPRToReviewWithProvider />);

    expect(screen.queryByText(/Next PR to Review :/i)).not.toBeInTheDocument();
  });
});
