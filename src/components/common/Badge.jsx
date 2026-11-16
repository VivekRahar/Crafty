import React from 'react';

/**
 * Reusable Badge Component
 * Demonstrates Unit II: Props-driven styling and conditional classes
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  const variantClasses = {
    default: 'bg-amber-100 text-amber-900 border border-amber-200',
    craft: 'bg-orange-100 text-orange-900 border border-orange-200',
    success: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-900 border border-amber-200',
    danger: 'bg-rose-100 text-rose-900 border border-rose-200',
    indigo: 'bg-indigo-100 text-indigo-900 border border-indigo-200',
    outline: 'bg-transparent text-slate-700 border border-slate-300'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};
