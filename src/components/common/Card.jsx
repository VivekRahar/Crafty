import React from 'react';

/**
 * Reusable Card Component
 * Demonstrates Unit II: Component composition via children
 */
export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm transition-all duration-200 ${
        hoverEffect ? 'hover:shadow-md hover:border-orange-300 hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
