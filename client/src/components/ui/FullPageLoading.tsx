import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface FullPageLoadingProps {
  message?: string;
}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" message={message} />
      </div>
    </div>
  );
};

export default FullPageLoading;
