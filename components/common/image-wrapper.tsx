import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Image as IconImage } from 'lucide-react';

interface ImageWrapperProps {
  alt: string;
  width: number;
  height: number;
  src?: string;
  priority?: boolean;
  className?: string;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        `flex justify-center items-center m-0 p-0 overflow-hidden rounded-lg border-none bg-[rgba(0,0,0,0.08)]`,
        width && `w-[${width}px]`,
        height && `h-[${height}px]`,
        className
      )}
    >
      {src ? (
        <Image
          className="w-full h-auto"
          src={src}
          alt={alt}
          height={height}
          width={width}
          priority={priority}
        />
      ) : (
        <IconImage className="w-8 h-8 fill-transparent" />
      )}
    </div>
  );
}
