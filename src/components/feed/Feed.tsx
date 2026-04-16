'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import VideoCard from '../VideoCard/VideoCard';
import VideoCardSkeleton from '../VideoCard/VideoCardSkeleton';
import { useLazyGetVideosQuery } from '~/store/api/youtubeApi';

export default function Feed() {
  const [trigger, { data: response, isLoading, isFetching, isError, refetch }] =
    useLazyGetVideosQuery();

  const videos = response?.videos;
  const nextToken = response?.nextPageToken;

  useEffect(() => {
    trigger(undefined);
  }, [trigger]);

  const { ref: sentinelRef } = useInView({
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && !isLoading && !isFetching && nextToken) {
        trigger(nextToken);
      }
    },
  });

  if (isLoading && !videos) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <VideoCardSkeleton key={i} className="animate-fade-in-up" />
        ))}
      </div>
    );
  }

  if (isError && !videos) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Error loading videos
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {videos?.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            className="animate-fade-in-up"
          />
        ))}
        {isFetching &&
          Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton
              key={`skeleton-${i}`}
              className="animate-fade-in-up"
            />
          ))}
      </div>

      <div
        ref={sentinelRef}
        className="flex flex-col items-center justify-center p-8"
      >
        {isError && videos && (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-zinc-500">Error loading more videos.</p>
            <button
              onClick={() => refetch()}
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Retry
            </button>
          </div>
        )}

        {!nextToken &&
          videos &&
          videos.length > 0 &&
          !isFetching &&
          !isError && (
            <p className="text-sm text-zinc-500">No more videos to load.</p>
          )}
      </div>
    </div>
  );
}
