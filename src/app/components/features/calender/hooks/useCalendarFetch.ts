import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setPostDates } from '@/store/slices/calendarSlice';
import { fetchCalenderPosts } from '@/app/actions/actions';
import { useErrorBoundary } from 'react-error-boundary';

export const useCalendarFetch = () => {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  const fetchPosts = useCallback(async (date: Date) => {
    try {
      dispatch(setLoading(true));
      const result = await fetchCalenderPosts(date);
      dispatch(setPostDates(result));
      return result;
    } catch (error) {
      showBoundary(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, showBoundary]);

  return { fetchPosts };
}; 