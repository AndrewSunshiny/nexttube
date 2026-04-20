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
      merge: (currentCache, newItems, { args }) => {
        // If we are fetching the first page (no pageToken), reset the cache for this query
        if (!args?.pageToken) {
          return {
            videos: newItems.videos,
            nextPageToken: newItems.nextPageToken,
          };
        }

        // Otherwise, append new videos for pagination
        if (currentCache.videos) {
          const existingIds = new Set(currentCache.videos.map((v) => v.id));
          const uniqueNewItems = newItems.videos.filter(
            (v) => !existingIds.has(v.id),
          );
          currentCache.videos.push(...uniqueNewItems);
        }
        currentCache.nextPageToken = newItems.nextPageToken;
        return currentCache;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetVideosQuery, useLazyGetVideosQuery } = youtubeApi;
