'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-8" />; // Placeholder to avoid layout shift
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme || 'system');
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
      }}
      className="relative"
    >
      {theme === 'system' && <Laptop className="size-4" />}
      {theme === 'dark' && <Sun className="size-4" />}
      {theme === 'light' && <Moon className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
