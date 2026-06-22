import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  default: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]',
  secondary: 'border-transparent bg-surface text-muted-foreground hover:bg-elevated-surface shadow-sm ring-1 ring-border',
  destructive: 'border-transparent bg-danger/10 text-danger hover:bg-danger/20',
  outline: 'text-foreground border-border',
  success: 'border-transparent bg-success/10 text-success hover:bg-success/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
};

function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
