import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-3 border-gray-600 border-t-blue-500 rounded-full"></div>
      </div>
      {message && (
        <p className="text-gray-400 text-sm text-center">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;