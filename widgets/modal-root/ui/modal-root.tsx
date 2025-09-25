'use client';

import { closeModal, modalSelector } from '@/entities/modal/store';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { ModalPortal } from '@/shared/ui/modal-portal';

import { ModalManager } from './modal-manager';

export function ModalRoot() {
  const { isOpen } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <ModalManager />
    </ModalPortal>
  );
}
