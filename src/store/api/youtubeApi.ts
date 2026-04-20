import { apiSlice } from './apiSlice';
import { YouTubeResponse } from '~/types/video';

export const youtubeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<YouTubeResponse, { q?: string; pageToken?: string } | void>({
      query: (args) => ({
        url: '/videos',
        params: {
          q: args?.q,
          pageToken: args?.pageToken,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Cache separate results for different search queries
        // If q is undefined, it's the "popular" feed
        const query = queryArgs?.q || 'popular';
        return `${endpointName}-${query}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        // Note: 'arg' object is available here and contains the query arguments (e.g., { q, pageToken })
        
        // If there is no existing cache or no videos, this is the first page.
        if (!currentCache || !currentCache.videos) {
          return {
            videos: newItems.videos,
            nextPageToken: newItems.nextPageToken,
          };
        }

        // Otherwise, we are paginating. Append new videos and filter duplicates.
        const existingIds = new Set(currentCache.videos.map((v) => v.id));
        const uniqueNewItems = newItems.videos.filter(
          (v) => !existingIds.has(v.id),
        );

        return {
          ...currentCache,
          videos: [...currentCache.videos, ...uniqueNewItems],
          nextPageToken: newItems.nextPageToken,
        };
      },


    }),
  }),
  overrideExisting: false,
});

export const { useGetVideosQuery, useLazyGetVideosQuery } = youtubeApi;
