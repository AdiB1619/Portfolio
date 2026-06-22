import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          'flex min-h-[48px] w-full rounded-xl border border-zinc-700 bg-zinc-950/70 px-4 py-2 text-sm text-white shadow-inner ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-zinc-600',
          error && 'border-danger focus-visible:ring-danger/30',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="absolute -bottom-5 left-0 text-xs text-danger">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
