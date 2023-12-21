import { useSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { calendarActions } from '@/store/calendar';
import dayjs from 'dayjs';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import { CalendarType } from '@/types/redux.calendar';
import { useEffect, useMemo } from 'react';

interface IProps {
  myBookHistoryData: MyBookPageQueriesHistoryListType;
  myBookTimeData: MyBookPageQueriesTimeRangeResponseType;
}

export default function useCalendarHook({
  myBookHistoryData,
  myBookTimeData,
}: IProps) {
  const dispatch = useDispatch();

  const calendarState = useSelector((state) => state.calendar.calendar);
  const setCalendarState = (state: CalendarType) => {
    dispatch(calendarActions.setCalendar(state));
  };

  const { startDate: myBookTimeStartDate, endDate: myBookTimeEndDate } =
    myBookTimeData;

  const startDate = myBookTimeStartDate
    ? dayjs(myBookTimeStartDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;
  const endDate = myBookTimeEndDate
    ? dayjs(myBookTimeEndDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;

  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(calendarState.year))
    .month(parseInt(calendarState.month) - 1);

  const numRows = Math.ceil(
    (calendarState.firstDOW + calendarState.lastDate) / 7
  );

  const updateMonthYear = (monthIncrement: number): void => {
    const newCalendar = getNewCalendar(calendarState, monthIncrement);
    setCalendarState(newCalendar);
  };

  const dataByDate = useMemo(() => {
    const data: CalendarDateByDataType = {};

    myBookHistoryData.forEach((item) => {
      const dateStr = dayjs(item.date).add(9, 'hour').format('YYYY-MM-DD');
      data[dateStr] = data[dateStr] || [];
      data[dateStr].push(item.status);
    });

    return data;
  }, [myBookHistoryData]);

  const prevMonthHandler: boolean = useMemo(() => {
    if (startDate) {
      return dayObj.isAfter(startDate, 'month');
    }
    return true;
  }, [startDate, updateMonthYear]);

  const nextMonthHandler: boolean = useMemo(() => {
    if (endDate) {
      return dayObj.isBefore(endDate, 'month');
    }
    return dayObj.isBefore(dayjs(), 'month');
  }, [endDate, updateMonthYear]);

  useEffect(() => {
    if (myBookTimeData && myBookTimeData.endDate) {
      setCalendarState(getCalendarDetail(dayjs(myBookTimeData.endDate)));
    }

    if (
      myBookTimeData &&
      myBookTimeData.endDate === undefined &&
      myBookTimeData.startDate
    ) {
      setCalendarState(getCalendarDetail(dayjs(myBookTimeData.startDate)));
    }
  }, [myBookTimeData, myBookTimeData?.endDate, myBookTimeData?.startDate]);

  return {
    updateMonthYear,
    numRows,
    startDate,
    endDate,
    dataByDate,
    calendarState,
    nextMonthHandler,
    prevMonthHandler,
  };
}
