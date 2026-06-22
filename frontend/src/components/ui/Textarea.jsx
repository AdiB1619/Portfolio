import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-main ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y',
          error && 'border-danger focus-visible:ring-danger',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="absolute -bottom-5 left-0 text-xs text-danger">{error}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
