'use client';

import useMyBookCommentQuery from '@/queries/my-book-comment/useMyBookCommentQuery';
import MyBookCommentItem from './_components/my_book_comment_item';
import { motion } from 'framer-motion';
export default function MyBookCommentPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { data } = useMyBookCommentQuery({ myBookId: params.my_book_id });

  if (!data) return <div>Not Found</div>;

  return (
    <motion.div
      className="w-full h-auto border-gray-300 shadow-md p-2 bg-transparent rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">한줄평</h2>
      {data.map((comment, index) => (
        <motion.div
          key={comment.commentId}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <MyBookCommentItem comment={comment} />
        </motion.div>
      ))}
    </motion.div>
  );
}
