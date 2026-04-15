import React from 'react';

export default function VideoCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3">
      <div className="relative aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
