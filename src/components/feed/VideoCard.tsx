import { useState, memo } from 'react';
import Image from 'next/image';
import { Video } from '~/types/video';
import VideoCardLayout from './VideoCardLayout';

interface VideoCardProps {
  video: Video;
  className?: string;
}

const TRANSITION_DURATION = 100; // in ms

const VideoCard = memo(function VideoCard({
  video,
  className,
}: VideoCardProps) {
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);
  const [showThumbnailGhost, setShowThumbnailGhost] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [showAvatarGhost, setShowAvatarGhost] = useState(true);

  const handleThumbnailLoad = () => {
    setIsThumbnailLoading(false);
    setTimeout(() => setShowThumbnailGhost(false), TRANSITION_DURATION);
  };

  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
    setTimeout(() => setShowAvatarGhost(false), TRANSITION_DURATION);
  };

  return (
    <VideoCardLayout
      className={className}
      thumbnail={
        <>
          {showThumbnailGhost && (
            <div className="absolute inset-0 z-10 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
          )}
          <Image
            src={
              thumbnailError
                ? 'https://picsum.photos/seed/fallback/400/225'
                : video.thumbnailUrl
            }
            alt={video.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className={`object-cover transition-all duration-[${TRANSITION_DURATION}ms] group-hover:scale-105 ${
              isThumbnailLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleThumbnailLoad}
            onError={() => setThumbnailError(true)}
          />
          <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </div>
        </>
      }
      avatar={
        <div className="relative h-9 w-9">
          {showAvatarGhost && (
            <div className="absolute inset-0 z-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          )}
          <Image
            src={video.channelAvatarUrl}
            alt={video.channelName}
            width={36}
            height={36}
            unoptimized
            className={`rounded-full transition-opacity duration-[${TRANSITION_DURATION}ms] ${
              isAvatarLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleAvatarLoad}
          />
        </div>
      }
      title={
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-zinc-900 dark:text-zinc-100">
          {video.title}
        </h3>
      }
      meta={
        <div className="flex flex-col text-xs text-zinc-600 dark:text-zinc-400">
          <span className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            {video.channelName}
          </span>
          <span className="flex items-center gap-1">
            {video.views} • {video.timestamp}
          </span>
        </div>
      }
    />
  );
});

export default VideoCard;
