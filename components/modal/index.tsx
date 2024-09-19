'use client';

import { motion } from 'framer-motion';

export default function Modal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
      className="absolute z-9999 w-full h-auto min-h-[10%] bottom-0 rounded-tl-lg rounded-tr-lg p-4 bg-slate-100"
    >
      Test Modal
    </motion.div>
  );
}
