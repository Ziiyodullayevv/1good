import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface Text_01Props {
  text: string;
  className?: string;
}

export default function ShimmerText({
  text = 'Text Shimmer',
  className,
}: Text_01Props) {
  return (
    <div className='flex items-center justify-center'>
      <motion.div
        className='relative overflow-hidden'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className={cn(
            'text-base bg-gradient-to-r font-medium from-white via-neutral-400 to-white bg-[length:200%_100%] bg-clip-text text-transparent',
            className
          )}
          animate={{
            backgroundPosition: ['200% center', '-200% center'],
          }}
          transition={{
            duration: 2.5,
            ease: 'linear',
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
}
