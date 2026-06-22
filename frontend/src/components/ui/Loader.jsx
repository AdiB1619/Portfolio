import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Loader({ className, size = 24, ...props }) {
  return (
    <Loader2 
      className={cn('animate-spin text-primary', className)} 
      size={size} 
      {...props} 
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader size={32} className="text-muted" />
    </div>
  );
}
