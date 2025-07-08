import type { DateRange } from 'react-day-picker';
import { isSameDay } from 'date-fns';
import { RANGE_DATEPICKER_MESSAGES } from './constants';
import { formatDateObjectToString } from '@/shared/utils/date';

export const dateRangeDisplay = (selected: DateRange | undefined) => {
  const from = selected?.from;
  const to = selected?.to;

  if (!from && !to) return RANGE_DATEPICKER_MESSAGES.DEFAULT;
  if (from && to) {
    const formattedFrom = formatDateObjectToString(from);
    const formattedTo = formatDateObjectToString(to);
    if (isSameDay(from, to)) return formattedFrom;
    return RANGE_DATEPICKER_MESSAGES.RANGE_SELECTED(formattedFrom, formattedTo);
  }
  if (from)
    return RANGE_DATEPICKER_MESSAGES.SELECT_END_DATE(
      formatDateObjectToString(from)
    );

  return RANGE_DATEPICKER_MESSAGES.UNEXPECTED_ERROR;
};
