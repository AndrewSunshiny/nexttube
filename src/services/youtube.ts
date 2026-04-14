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
    // 1. Search for videos to get the list of IDs and the nextPageToken
    const searchResponse = await youtube.search.list({
      part: ['snippet'],
      maxResults: maxResults,
      pageToken: pageToken,
      q: 'trending', // Using a search query to allow pagination
      type: ['video'],
      regionCode: 'US',
    });

    const searchItems = searchResponse.data.items || [];
    const videoIds = searchItems
      .map((item) => item.id?.videoId)
      .filter(Boolean) as string[];
    const nextPageToken = searchResponse.data.nextPageToken || null;

    if (videoIds.length === 0) {
      return { videos: [], nextPageToken: null };
    }

    // 2. Fetch full details for those IDs to get views and duration
    const videoDetailsResponse = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: videoIds.join(','),
    });

    const videoItems = videoDetailsResponse.data.items || [];

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
