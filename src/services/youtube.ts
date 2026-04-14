import { google } from 'googleapis';
import { Video } from '~/types/video';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getTrendingVideos(maxResults = 20): Promise<Video[]> {
  try {
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      maxResults: maxResults,
      regionCode: 'US',
    });

    const items = response.data.items || [];

    return items.map((item) => ({
      id: item.id!,
      title: item.snippet?.title || 'Untitled Video',
      thumbnailUrl:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        '',
      channelName: item.snippet?.channelTitle || 'Unknown Channel',
      channelAvatarUrl: `https://i.pravatar.cc/150?u=${item.snippet?.channelId}`,
      views: formatViews(item.statistics?.viewCount),
      timestamp: 'Recent', // YouTube API doesn't give a simple "2 days ago" string
      duration: formatDuration(item.contentDetails?.duration || 'PT0M0S'),
    }));
  } catch (error) {
    console.error('Error fetching trending videos from YouTube API:', error);
    throw new Error('Failed to fetch videos from YouTube');
  }
}

function formatViews(views: string | undefined): string {
  if (!views) return '0 views';
  const num = parseInt(views, 10);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
  return `${num} views`;
}

function formatDuration(duration: string): string {
  // ISO 8601 duration format (e.g., PT15M30S)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
