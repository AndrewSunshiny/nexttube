import VideoCard from './VideoCard';
import { Video } from '~/types/video';

interface FeedProps {
  videos: Video[];
}

export default function Feed({ videos }: FeedProps) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:p-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
