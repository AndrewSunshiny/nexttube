import Image from 'next/image';
import { Video } from '~/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group flex cursor-pointer flex-col gap-3">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </div>
      </div>

      {/* Details */}
      <div className="flex gap-3">
        <div className="shrink-0">
          <Image
            src={video.channelAvatarUrl}
            alt={video.channelName}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
            {video.title}
          </h3>
          <div className="flex flex-col text-xs text-zinc-600 dark:text-zinc-400">
            <span className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
              {video.channelName}
            </span>
            <span className="flex items-center gap-1">
              {video.views} • {video.timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
