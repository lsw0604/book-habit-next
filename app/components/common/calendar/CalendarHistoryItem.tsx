'use client';

import { useCallback } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import IconButton from 'components/common/button/IconButton';
import { IconTrashCan } from 'style/icon';
import { STATUS_WORD_OBJECT, STATUS_COLOR_OBJECT } from '@/utils/staticData';
import { getCalendarDetail } from '@/utils/calendar';
import { useAppDispatch } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';
import { modalActions } from '@/app/store/modal';
import { calendarActions } from '@/app/store/calendar';

const Container = styled.li`
  width: 100%;
  height: 100%;
  display: inline-flex;
  cursor: pointer;
  scroll-snap-align: start;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
`;

const HistoryStatusMessage = styled.span<{ status: HistoryStatusType }>`
  color: ${({ status }) => STATUS_COLOR_OBJECT[status]};
`;

const HistoryMessage = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const HistoryCreatedAt = styled.div`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColorBadge = styled.div<{ status: HistoryStatusType }>`
  width: 1rem;
  border-radius: 8px 0 0 8px;
  height: auto;
  background-color: ${({ status }) => STATUS_COLOR_OBJECT[status]};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CalendarHistoryItem({
  id,
  status,
  date,
  created_at,
  updated_at,
  users_books_id,
}: MyBookPageQueriesHistoryItemType & {
  users_books_id: number;
}) {
  const dispatch = useAppDispatch();

  const onChangeUsersBooksId = useCallback((users_books_id: number) => {
    dispatch(myBookActions.setMyBookUsersBooksId(users_books_id));
  }, []);

  const onChangeHistoryId = useCallback((history_id: number) => {
    dispatch(myBookActions.setMyBookHistoryId(history_id));
  }, []);

  const onChangeModal = useCallback((type: ModalComponentType) => {
    dispatch(modalActions.setModalType(type));
  }, []);

  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');
  const createdAtDate = dayjs(created_at).format('YYYY-MM-DD');
  const updatedAtDate = updated_at
    ? dayjs(updated_at).format('YYYY-MM-DD')
    : undefined;

  const deleteHandler = () => {
    onChangeUsersBooksId(users_books_id);
    onChangeHistoryId(id);
    onChangeModal('deleteHistory');
  };

  const navigateCalendar = () => {
    dispatch(
      calendarActions.setCalendar(
        getCalendarDetail(dayjs(`${year}-${month}`).format('YYYY-MM'))
      )
    );
  };

  return (
    <Container>
      <ColorBadge status={status} />
      <Content onClick={navigateCalendar}>
        <HistoryMessage>
          {`${year}년 ${month}월 ${day}일`}&nbsp;
          <HistoryStatusMessage status={status}>
            {STATUS_WORD_OBJECT[status]}
          </HistoryStatusMessage>
        </HistoryMessage>
        <HistoryCreatedAt>
          {updatedAtDate ? <p>📅{updatedAtDate}</p> : <p>📅{createdAtDate}</p>}
        </HistoryCreatedAt>
      </Content>
      <IconWrapper>
        <IconButton icon={<IconTrashCan />} onClick={deleteHandler}>
          Delete
        </IconButton>
      </IconWrapper>
    </Container>
  );
}
