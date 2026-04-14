import { NextResponse } from 'next/server';
import { getTrendingVideos } from '~/services/youtube';

export async function GET() {
  try {
    const videos = await getTrendingVideos();
    return NextResponse.json(videos);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from YouTube' },
      { status: 500 },
    );
  }
}
