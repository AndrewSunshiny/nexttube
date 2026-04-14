import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Video, YouTubeResponse } from '~/types/video';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getVideos: builder.query<YouTubeResponse, string | void>({
      query: (pageToken) => ({
        url: '/videos',
        params: pageToken ? { pageToken } : {},
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.videos) {
          currentCache.videos.push(...newItems.videos);
        }
        currentCache.nextPageToken = newItems.nextPageToken;
      },
    }),
  }),
});

export const { useGetVideosQuery } = youtubeApi;
