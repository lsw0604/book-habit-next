'use client';

import { useModal, getModalTitle, modalSelector } from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';
import { ModalPortal } from '@/shared/ui/modal-portal';

import { ModalManager } from './modal-manager';

export function ModalRoot() {
  const { isOpen, type } = useAppSelector(modalSelector);
  const { close } = useModal();

  const title = getModalTitle(type);

  const onClose = () => {
    close();
  };

  return (
    <ModalPortal isOpen={isOpen} onClose={onClose} title={title}>
      <ModalManager />
    </ModalPortal>
  );
}
