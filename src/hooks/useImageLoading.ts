import { useState, useCallback } from 'react';

interface LoadingState {
  thumb: boolean;
  thumbGhost: boolean;
  avatar: boolean;
  avatarGhost: boolean;
}

export function useImageLoading(transitionDuration: number = 300) {
  const [loading, setLoading] = useState<LoadingState>({
    thumb: true,
    thumbGhost: true,
    avatar: true,
    avatarGhost: true,
  });

  const handleThumbnailLoad = useCallback(() => {
    setLoading((prev) => ({ ...prev, thumb: false }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, thumbGhost: false }));
    }, transitionDuration);
  }, [transitionDuration]);

  const handleAvatarLoad = useCallback(() => {
    setLoading((prev) => ({ ...prev, avatar: false }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, avatarGhost: false }));
    }, transitionDuration);
  }, [transitionDuration]);

  return {
    loading,
    handleThumbnailLoad,
    handleAvatarLoad,
  };
}
