import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsPost, CompetitionPost, Value } from '@/app/definitions/types';

interface CalendarState {
  date: string;
  isLoading: boolean;
  newsDates: string[];
  competitionDates: string[];
  newsPostsData: NewsPost[];
  competitionPostData: CompetitionPost[];
  selectedPosts: (NewsPost | CompetitionPost)[];
  currentPosts: (NewsPost | CompetitionPost)[];
  isSearching: boolean;
  searchTerm: string;
}

const initialState: CalendarState = {
  date: new Date().toISOString(),
  isLoading: false,
  newsDates: [],
  competitionDates: [],
  newsPostsData: [],
  competitionPostData: [],
  selectedPosts: [],
  currentPosts: [],
  isSearching: false,
  searchTerm: '',
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string | Value>) => {
      if (typeof action.payload === 'string') {
        state.date = action.payload;
      } else if (Array.isArray(action.payload)) {
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
    setSelectedPosts: (state, action: PayloadAction<(NewsPost | CompetitionPost)[]>) => {
      state.selectedPosts = action.payload;
    },
    clearSelectedPosts: (state) => {
      state.selectedPosts = [];
    },
    setCurrentPosts: (state, action: PayloadAction<(NewsPost | CompetitionPost)[]>) => {
      state.currentPosts = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { 
  setDate, 
  setLoading, 
  setPostDates, 
  setSelectedPosts, 
  clearSelectedPosts,
  setCurrentPosts,
  setIsSearching,
  setSearchTerm
} = calendarSlice.actions;

export default calendarSlice.reducer; 