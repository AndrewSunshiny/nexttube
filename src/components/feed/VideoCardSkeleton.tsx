import React from 'react';
import VideoCardLayout from './VideoCardLayout';

export default function VideoCardSkeleton({
  className,
}: {
  className: string;
}) {
  return (
    <VideoCardLayout
      thumbnail={
        <div className="h-full w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      }
      avatar={
        <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      }
      title={
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      }
      meta={
        <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      }
      className={className}
    />
  );
}
