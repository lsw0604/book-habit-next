'use client';

import { closeModal, getModalTitle, modalSelector } from '@/entities/modal';
import { useAppDispatch, useAppSelector } from '@/shared/redux';
import { ModalPortal } from '@/shared/ui/modal-portal';

import { ModalManager } from './modal-manager';

export function ModalRoot() {
  const { isOpen, type } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const title = getModalTitle(type);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalPortal isOpen={isOpen} onClose={onClose} title={title}>
      <ModalManager />
    </ModalPortal>
  );
}
