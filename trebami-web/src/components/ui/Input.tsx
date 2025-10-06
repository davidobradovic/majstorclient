import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'input-modern block w-full px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-300 disabled:bg-slate-50/50 disabled:text-slate-500',
          error && 'border-red-400/50 focus:ring-red-500 focus:border-red-400/50 focus:shadow-red-500/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
};
