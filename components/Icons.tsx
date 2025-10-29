
import React from 'react';

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 12h-1.5m-1.5 0h-1.5m-1.5 0H13m-1.5 0H10m-1.5 0H7m-1.5 0H4.5m15 4.5h-1.5m-1.5 0h-1.5m-1.5 0H13m-1.5 0H10m-1.5 0H7m-1.5 0H4.5m15-9h-1.5m-1.5 0h-1.5m-1.5 0H13m-1.5 0H10m-1.5 0H7m-1.5 0H4.5M12 21v-1.5m0-1.5v-1.5m0-1.5v-1.5m0-1.5V13m0-1.5V10m0-1.5V7m0-1.5V4.5M12 3v1.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.05 4.95a7.5 7.5 0 109.9 9.9"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.9 12a8.1 8.1 0 018.1-8.1"
    />
  </svg>
);

export const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-2.908.942-5.065 2.825-6.439l.958 1.483c-1.333.858-2.001 2.219-2.001 4.107v8.24h-1.782zm-8.017 0v-7.391c0-2.908.942-5.065 2.825-6.439l.958 1.483c-1.333.858-2.001 2.219-2.001 4.107v8.24h-1.782z"/>
  </svg>
);
