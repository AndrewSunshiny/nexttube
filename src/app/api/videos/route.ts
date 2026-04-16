import { NextResponse, NextRequest } from 'next/server';
import { getVideos } from '~/services/youtube';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get('pageToken') || undefined;

    const data = await getVideos(pageToken);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from YouTube' },
      { status: 500 },
    );
  }
}
