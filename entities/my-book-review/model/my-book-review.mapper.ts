/* eslint-disable no-underscore-dangle */
import { parseISO } from 'date-fns';

import type { MyBookReviewDTO } from '../api';

import type {
  MyBookReview,
  SerializedMyBookReview,
} from './my-book-review.model';

/**
 * API로부터 받은 MyBookReviewDTO(Raw Data)를 클라이언트에서 사용하기 위한 MyBookReview(ViewModel)로 변환합니다.
 * DTO의 날짜 문자열들을 Date 객체로 파싱합니다.
 * @param dto - 변환할 MyBookReviewDTO 객체.
 * @returns 변환된 MyBookReview(ViewModel) 객체.
 */
export const toMyBookReviewViewModel = (
  dto: MyBookReviewDTO
): MyBookReview => ({
  id: dto.id,
  myBookId: dto.myBookId,
  review: dto.review,
  isPublic: dto.isPublic,
  _count: dto._count,
  createdAt: parseISO(dto.createdAt),
  updatedAt: parseISO(dto.updatedAt),
});

/**
 * MyBookReview(ViewModel)을 Redux 스토어에 저장하기 위해 직렬화 가능한 객체(SerializedMyBookReview)로 변환합니다.
 * ViewModel의 Date 객체들을 ISO 문자열로 변환합니다.
 * @param viewModel - 직렬화할 MyBookReview(ViewModel) 객체.
 * @returns 직렬화된 객체.
 */
export const serializeMyBookReview = (
  viewModel: MyBookReview
): SerializedMyBookReview => ({
  id: viewModel.id,
  myBookId: viewModel.myBookId,
  review: viewModel.review,
  isPublic: viewModel.isPublic,
  _count: viewModel._count,
  createdAt: viewModel.createdAt.toISOString(),
  updatedAt: viewModel.updatedAt.toISOString(),
});

/**
 * Redux 스토어에서 가져온 직렬화된 객체(SerializedMyBookReview)를 클라이언트에서 사용하기 위한 MyBookReview(ViewModel)로 변환합니다.
 * 직렬화된 객체의 날짜 문자열들을 Date 객체로 파싱합니다.
 * @param serializable - 역직렬화할 객체.
 * @returns 변환된 MyBookReview(ViewModel) 객체.
 */
export const deserializeMyBookReview = (
  serializable: SerializedMyBookReview
): MyBookReview => ({
  id: serializable.id,
  myBookId: serializable.myBookId,
  review: serializable.review,
  isPublic: serializable.isPublic,
  _count: serializable._count,
  createdAt: parseISO(serializable.createdAt),
  updatedAt: parseISO(serializable.updatedAt),
});
