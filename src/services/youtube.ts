import { google } from 'googleapis';
import { Video } from '~/types/video';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export interface YouTubeResponse {
  videos: Video[];
  nextPageToken: string | null;
}

export async function getVideos(
  pageToken?: string,
  maxResults = 20,
): Promise<YouTubeResponse> {
  try {
    // Fetch most popular videos directly
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: maxResults,
      pageToken: pageToken,
    });

    const videoItems = response.data.items || [];
    const nextPageToken = response.data.nextPageToken || null;

    const videos = videoItems.map((item) => ({
      id: item.id!,
      title: item.snippet?.title || 'Untitled Video',
      thumbnailUrl:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        '',
      channelName: item.snippet?.channelTitle || 'Unknown Channel',
      channelAvatarUrl: `https://i.pravatar.cc/150?u=${item.snippet?.channelId}`,
      views: formatViews(item.statistics?.viewCount),
      timestamp: 'Recent',
      duration: formatDuration(item.contentDetails?.duration || 'PT0M0S'),
    }));

    return {
      videos,
      nextPageToken,
    };
  } catch (error) {
    console.error('Error fetching videos from YouTube API:', error);
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
