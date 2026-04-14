export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelAvatarUrl: string;
  views: string;
  timestamp: string;
  duration: string;
}

export interface YouTubeResponse {
  videos: Video[];
  nextPageToken: string | null;
}
