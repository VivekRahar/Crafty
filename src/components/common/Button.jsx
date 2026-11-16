import React from 'react';

/**
 * Reusable Button Component
 * Demonstrates Unit II: Component reusability, props handling, and loading state
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg shadow-orange-500/20 focus:ring-orange-500 active:scale-[0.98]',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md focus:ring-slate-700 active:scale-[0.98]',
    outline: 'border-2 border-orange-600 text-orange-700 hover:bg-orange-50 focus:ring-orange-500 active:scale-[0.98]',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    craft: 'bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-900/20 focus:ring-amber-600 active:scale-[0.98]',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 focus:ring-emerald-500 active:scale-[0.98]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};
