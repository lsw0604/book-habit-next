import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Image as IconImage } from 'lucide-react';

interface ImageWrapperProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        'bg-[rgba(0,0,0,0.08)] flex justify-center items-center m-0 p-0 rounded-[5px] border-none',
        width && `w-[${width}px]`,
        height && `h-[${height}px]`
      )}
    >
      {src ? (
        <Image
          className="w-full h-auto object-cover rounded-[5px]"
          src={src}
          alt={alt}
          height={height}
          width={width}
        />
      ) : (
        <IconImage className="w-8 h-8 fill-transparent" />
      )}
    </div>
  );
}
