import dayjs from 'dayjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CalendarType, RootCalendarType } from '@/types/redux.calendar';
import { getCalendarDetail } from '@/utils/calendar';

const initialState: RootCalendarType = {
  calendar: getCalendarDetail(dayjs().format()),
};

const calendar = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendar(state, action: PayloadAction<CalendarType>) {
      state.calendar = action.payload;
    },
  },
});

export const calendarActions = { ...calendar.actions };

export default calendar;
