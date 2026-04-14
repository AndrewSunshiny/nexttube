import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '~/types/video';
import videos from '~/mocks/videos.json';

interface FeedState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  videos: videos as Video[],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setVideos, setLoading, setError } = feedSlice.actions;
export default feedSlice.reducer;
