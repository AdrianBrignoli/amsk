import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsPost, CompetitionPost } from '@/app/definitions/types';

interface PostsState {
  posts: (NewsPost | CompetitionPost)[];
  isSearching: boolean;
  searchTerm: string;
  error: string | null;
  isLoadingMore: boolean;
  hasMore: boolean;
  total: number;
  savedState: {
    posts: (NewsPost | CompetitionPost)[];
    count: number;
  };
}

const initialState: PostsState = {
  posts: [],
  isSearching: false,
  searchTerm: '',
  error: null,
  isLoadingMore: false,
  hasMore: true,
  total: 0,
  savedState: {
    posts: [],
    count: 0
  }
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<{
      items: (NewsPost | CompetitionPost)[];
      total: number;
    }>) => {
      state.posts = action.payload.items;
      state.total = action.payload.total;
      state.hasMore = state.posts.length < action.payload.total;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload;
    },
    setSavedState: (state, action: PayloadAction<{
      posts: (NewsPost | CompetitionPost)[];
      count: number;
    }>) => {
      state.savedState = action.payload;
    },
    appendPosts: (state, action: PayloadAction<{
      items: (NewsPost | CompetitionPost)[];
      total: number;
    }>) => {
      state.posts = [...state.posts, ...action.payload.items];
      state.total = action.payload.total;
      state.hasMore = state.posts.length < action.payload.total;
    }
  },
});

export const {
  setPosts,
  setIsSearching,
  setSearchTerm,
  setError,
  setIsLoadingMore,
  setSavedState,
  appendPosts
} = postsSlice.actions;

export default postsSlice.reducer; 