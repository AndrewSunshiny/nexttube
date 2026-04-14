import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Video } from '~/types/video';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTrendingVideos: builder.query<Video[], void>({
      query: () => '/videos',
    }),
  }),
});

export const { useGetTrendingVideosQuery } = youtubeApi;
