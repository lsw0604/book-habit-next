import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';
import { IconImage } from '@/style/icon';
import { cn } from '@/utils/class-name';

interface ImageWrapperProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  quality?: number;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  objectFit = 'cover',
  quality = 75,
  ...props
}: ImageWrapperProps) {
  const image_style = {
    objectFit,
  } as const;

  return (
    <div
      className={cn(
        'flex justify-center items-center m-0 p-0 overflow-hidden rounded-lg border-none bg-[rgba(0,0,0,0.08)]',
        width && height && `w-[${width}px] h-[${height}px]`,
        className
      )}
    >
      {src ? (
        <Image
          className="w-full h-full"
          src={src}
          alt={alt}
          height={height}
          width={width}
          priority={priority}
          quality={quality}
          style={image_style}
          {...props}
        />
      ) : (
        <IconImage className="w-1/3 h-1/3 text-gray-300" />
      )}
    </div>
  );
}
