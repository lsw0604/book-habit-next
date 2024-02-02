import React from 'react';
import ModalHeader from './modal-header';
import ModalLogoContent from './modal-logo-content';
import { TrashIcon } from 'lucide-react';
import { LogoSad } from '@/style/icon';
import { Button } from '../ui/button';

const HEADER_OPTION = {
  title: '댓글을 삭제하시겠어요?',
  sub: '한번 삭제하면 복구 할 수 없습니다.',
  icon: <TrashIcon />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function DeleteReplyModal() {
  return (
    <div className="flex flex-col justify-evenly text-xl">
      <ModalHeader {...HEADER_OPTION} />
      <ModalLogoContent {...BODY_OPTION} />
      <div className="flex flex-row gap-2">
        <Button>삭제할게요.</Button>
        <Button>아니요.</Button>
      </div>
    </div>
  );
}
