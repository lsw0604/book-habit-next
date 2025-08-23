import { format, isSameDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { RANGE_DATEPICKER_MESSAGES } from './constants';

export const dateRangeDisplay = (selected: DateRange | undefined) => {
  const from = selected?.from;
  const to = selected?.to;

  if (!from && !to) return RANGE_DATEPICKER_MESSAGES.DEFAULT;
  if (from && to) {
    const formattedFrom = format(from, 'yyyy-MM-dd');
    const formattedTo = format(to, 'yyyy-MM-dd');
    if (isSameDay(from, to)) return formattedFrom;
    return RANGE_DATEPICKER_MESSAGES.RANGE_SELECTED(formattedFrom, formattedTo);
  }
  if (from)
    return RANGE_DATEPICKER_MESSAGES.SELECT_END_DATE(
      format(from, 'yyyy-MM-dd')
    );

  return RANGE_DATEPICKER_MESSAGES.UNEXPECTED_ERROR;
};
