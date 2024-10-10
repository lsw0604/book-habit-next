'use client';

import { ListFilterIcon } from 'lucide-react';
import Popover from '@/components/common/popover';
import { Button } from '@/components/ui/button';
import CommentForm from './comment-form';

export default function CommentPopover() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost" type="button" className="p-1">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="p-0 right-0">
        <CommentForm />
      </Popover.Content>
    </Popover>
  );
}
