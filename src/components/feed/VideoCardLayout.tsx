import React from 'react';

interface VideoCardLayoutProps {
  thumbnail: React.ReactNode;
  avatar: React.ReactNode;
  title: React.ReactNode;
  meta: React.ReactNode;
}

export default function VideoCardLayout({
  thumbnail,
  avatar,
  title,
  meta,
}: VideoCardLayoutProps) {
  return (
    <div className="group flex cursor-pointer flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        {thumbnail}
      </div>
      <div className="flex gap-3">
        <div className="shrink-0">{avatar}</div>
        <div className="flex flex-1 flex-col gap-1">
          {title}
          {meta}
        </div>
      </div>
    </div>
  );
}
