import React from 'react';

export function PoweredByVyuh({ className }: { className?: string }) {
  return (
    <div
      className={`mt-4 rounded border border-neutral-200 bg-white/50 px-2 py-0.5 text-center text-xs text-neutral-500 ${className}`}
    >
      Powered by Vyuh
    </div>
  );
}
