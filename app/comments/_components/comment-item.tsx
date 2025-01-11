import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function CommentItem({
  book,
  comment,
  commentId,
  commentLikes,
  commentReplyCount,
  createdAt,
  updatedAt,
  user,
}: PublicCommentItem) {
  if (!user) {
    return null;
  }
  return (
    <Link href={`/comments/${commentId}`} className="w-auto h-auto clear-both">
      <div className="p-4 border rounded-lg mb-3 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {user.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-700">{user.name}</p>
              <p className="mt-1 text-gray-600">{comment}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{commentLikes.length}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{commentReplyCount}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          {book && <span className="text-sm text-gray-500">{book.title}</span>}
        </div>
      </div>
    </Link>
  );
}
