'use client';

import * as React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setTheme, ThemeMode } from '~/store/slices/themeSlice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-8" />; // Placeholder to avoid layout shift
  }

  const toggleTheme = () => {
    const themes: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % themes.length;
    dispatch(setTheme(themes[nextIndex]));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {mode === 'system' && <Laptop className="size-4" />}
      {mode === 'dark' && <Moon className="size-4" />}
      {mode === 'light' && <Sun className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
