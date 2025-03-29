import React from 'react';

export function PoweredByVyuh({ className }: { className?: string }) {
  return (
    <div
      className={`vc:mt-4 vc:rounded vc:border vc:border-neutral-200 vc:bg-white/50 vc:px-2 vc:py-0.5 vc:text-center vc:text-xs vc:text-neutral-500 ${className}`}
    >
      Powered by Vyuh
    </div>
  );
}
