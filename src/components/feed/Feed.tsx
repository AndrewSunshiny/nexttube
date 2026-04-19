'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import VideoCard from '~components/VideoCard/VideoCard';
import VideoCardSkeleton from '~components/VideoCard/VideoCardSkeleton';
import { useLazyGetVideosQuery } from '~/store/api/youtubeApi';
import { Button } from '~/components/ui/button';

export default function Feed() {
  const [fetchVideos, { data, isLoading, isFetching, isError }] =
    useLazyGetVideosQuery();

  const videos = data?.videos;
  const nextToken = data?.nextPageToken;

  const { ref: sentinelRef } = useInView({
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && !isLoading && !isFetching && nextToken) {
        fetchVideos(nextToken);
      }
    },
  });

  const refetch = () => {
    if (nextToken) fetchVideos(nextToken);
    else fetchVideos(undefined, false);
  };

  useEffect(() => {
    fetchVideos(undefined);
  }, [fetchVideos]);

  // # render section
  if (isLoading && !videos) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <VideoCardSkeleton key={i} className="animate-fade-in-up" />
        ))}
      </div>
    );
  }

  if (videos) {
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
              <p className="text-muted-foreground text-sm">
                Error loading more videos.
              </p>
              <Button onClick={() => refetch()}> Retry</Button>
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

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-foreground mb-2 text-xl font-bold">
          Error loading videos
        </h2>
        <p className="text-muted-foreground mb-4">
          Please check your connection and try again.
        </p>
        <Button onClick={() => refetch()}> Retry</Button>
      </div>
    );
  }
}
