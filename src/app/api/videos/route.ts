import { NextResponse, NextRequest } from 'next/server';
import { getVideos, searchVideos } from '~/services/youtube';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const pageToken = searchParams.get('pageToken') || undefined;

    const data = query 
      ? await searchVideos(query, pageToken) 
      : await getVideos(pageToken);
      
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from YouTube' },
      { status: 500 },
    );
  }
}
