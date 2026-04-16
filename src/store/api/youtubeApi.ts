import { apiSlice } from './apiSlice';
import { YouTubeResponse } from '~/types/video';

export const youtubeApi = apiSlice.injectEndpoints({
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
          const existingIds = new Set(currentCache.videos.map((v) => v.id));
          const uniqueNewItems = newItems.videos.filter(
            (v) => !existingIds.has(v.id),
          );
          currentCache.videos.push(...uniqueNewItems);
        }
        currentCache.nextPageToken = newItems.nextPageToken;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetVideosQuery, useLazyGetVideosQuery } = youtubeApi;
