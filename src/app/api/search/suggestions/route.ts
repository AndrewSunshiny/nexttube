import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: response.status });
    }

    const data = await response.json();
    
    // Google Suggest API returns: ["query", ["suggestion1", "suggestion2", ...], ...]
    const suggestions = data[1] || [];
    
    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
