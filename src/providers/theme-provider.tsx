'use client';

import { useEffect, useState, ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setTheme, ThemeMode } from '~/store/slices/themeSlice';

function ThemeSync() {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
  const dispatch = useAppDispatch();
  const reduxMode = useAppSelector((state) => state.theme.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initial Sync: Redux vs next-themes
    if (!mounted) {
      if (reduxMode !== 'system') {
        // Prioritize Redux if it's explicitly set to light or dark
        setNextTheme(reduxMode);
      } else if (nextTheme && nextTheme !== 'system') {
        // If Redux is system, but next-themes has a preference, sync Redux
        dispatch(setTheme(nextTheme as ThemeMode));
      }
      // * runs only once
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }
    // Continuous Sync: Redux -> next-themes
    else {
      setNextTheme(reduxMode);
    }
  }, [mounted, dispatch, reduxMode, nextTheme, setNextTheme]);

  return null;
}

export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
