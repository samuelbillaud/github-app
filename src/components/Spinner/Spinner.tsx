import { FC } from 'react';

import { spinnerContainer, loadingSpinner } from './Spinner.css';

export const Spinner: FC = () => (
  <div className={spinnerContainer}>
    <div className={loadingSpinner}></div>
  </div>
);
