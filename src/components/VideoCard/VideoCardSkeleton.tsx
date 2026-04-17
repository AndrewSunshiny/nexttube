import React from 'react';
import VideoCardLayout from './VideoCardLayout';
import { ghostVariants } from '~/components/primitives/ghost-variants';
import { cn } from '~/lib/utils';

export default function VideoCardSkeleton({
  className,
}: {
  className: string;
}) {
  return (
    <VideoCardLayout
      thumbnail={
        <div
          className={cn(ghostVariants({ shape: 'full' }), 'h-full w-full')}
        />
      }
      avatar={
        <div className={cn(ghostVariants({ shape: 'circle' }), 'h-9 w-9')} />
      }
      title={<div className={cn(ghostVariants(), 'h-4 w-3/4')} />}
      meta={<div className={cn(ghostVariants(), 'h-3 w-1/2')} />}
      className={className}
    />
  );
}
