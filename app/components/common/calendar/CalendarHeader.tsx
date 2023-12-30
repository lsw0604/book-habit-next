import Selector from 'components/common/selector';
import CalendarHeaderButtons from 'components/common/calendar/CalendarHeaderButtons';

export default function CalendarHeader({
  myBookHistoryData,
  myBookTimeData,
  filter,
  setFilter,
  options,
}: CalendarHeaderType) {
  return (
    <CalendarHeaderButtons
      myBookHistoryData={myBookHistoryData}
      myBookTimeData={myBookTimeData}
    >
      <Selector
        multiple
        value={filter}
        onChange={(e) => setFilter(e)}
        options={options}
      />
    </CalendarHeaderButtons>
  );
}
