'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
  onClick?: () => void;
}

const sizeVariants = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-4xl',
};

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback = 'T3',
  className,
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const showFallback = !src || imageError || !imageLoaded;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'border-2 border-primary-500 bg-[#F3EBF9]',
        sizeVariants[size],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      {src && !imageError && (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn('object-cover', !imageLoaded && 'opacity-0')}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {showFallback && <span className="font-bold text-primary-500 select-none">{fallback}</span>}
    </div>
  );
}
