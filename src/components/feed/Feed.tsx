'use client';

import VideoCard from './VideoCard';
import { useGetVideosQuery } from '~/store/api/youtubeApi';

export default function Feed() {
  const { data: response, isLoading, isError } = useGetVideosQuery();
  const videos = response?.videos;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:p-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex animate-pulse flex-col gap-3">
            <div className="relative aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Error loading videos
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:p-6">
      {videos?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
