import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsPost, CompetitionPost, Value } from '@/app/misc/types';

interface CalendarState {
  date: string;
  isLoading: boolean;
  newsDates: string[];
  competitionDates: string[];
  newsPostsData: NewsPost[];
  competitionPostData: CompetitionPost[];
}

const initialState: CalendarState = {
  date: new Date().toISOString(),
  isLoading: false,
  newsDates: [],
  competitionDates: [],
  newsPostsData: [],
  competitionPostData: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Value>) => {
      if (Array.isArray(action.payload)) {
        state.date = action.payload[0]?.toISOString() || new Date().toISOString();
      } else if (action.payload instanceof Date) {
        state.date = action.payload.toISOString();
      } else {
        state.date = new Date().toISOString();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPostDates: (state, action: PayloadAction<{
      newsPostData: NewsPost[];
      competitionPostData: CompetitionPost[];
    }>) => {
      const formatDates = (posts: { publishDate: string }[]) => 
        posts
          .map(post => post.publishDate)
          .filter(Boolean);

      state.newsDates = formatDates(action.payload.newsPostData);
      state.competitionDates = formatDates(action.payload.competitionPostData);
      state.newsPostsData = action.payload.newsPostData;
      state.competitionPostData = action.payload.competitionPostData;
    },
  },
});

export const { setDate, setLoading, setPostDates } = calendarSlice.actions;
export default calendarSlice.reducer; 