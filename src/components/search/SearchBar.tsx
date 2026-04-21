'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from '~/components/ui/input-group';
import { Spinner } from '~/components/ui/spinner';
import { cn } from '~/lib/utils';
import { Search } from 'lucide-react';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '~/components/ui/popover';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    group: 'h-8',
    input: 'h-8',
    button: 'icon-xs' as const,
  },
  md: {
    group: 'h-10',
    input: 'h-10',
    button: 'icon-sm' as const,
  },
  lg: {
    group: 'h-12',
    input: 'h-12',
    button: 'icon-sm' as const,
  },
};

const CHARS_TO_TRIGGER = 3;

export default function SearchBar({
  className,
  placeholder = 'Search',
  size = 'md',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const styles = sizeStyles[size];

  useEffect(() => {
    if (query.trim().length < CHARS_TO_TRIGGER) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(query.trim())}`,
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
          setActiveIndex(-1);
        }
      } catch (e) {
        console.error('Error fetching suggestions:', e);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (query.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(query.trim()).replace(/%20/g, '+')}`,
      );
    } else {
      router.push('/');
    }
  };

  const handleSuggestionClick = (suggestion: string = '') => {
    setQuery(suggestion);
    setShowSuggestions(false);
    router.push(
      `/search?q=${encodeURIComponent(suggestion).replace(/%20/g, '+')}`,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        return;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev >= 0 ? prev - 1 : prev));
        return;
      case 'Enter':
        e.preventDefault();
        const finalQuery = activeIndex >= 0 ? suggestions[activeIndex] : query;
        if (finalQuery.trim()) handleSuggestionClick(finalQuery);
        else router.push('/');
        return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value ?? '';
    if (value.trim().length >= CHARS_TO_TRIGGER) setShowSuggestions(true);
    setQuery(value);
  };

  const handleInputFocus = () => {
    if (query.trim().length >= CHARS_TO_TRIGGER) setShowSuggestions(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full items-center gap-2', className)}
    >
      <Popover open={showSuggestions}>
        <PopoverAnchor className="w-full">
          <InputGroup className={cn(styles.group, 'rounded-full')}>
            <InputGroupInput
              value={query}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className={cn(styles.input, 'rounded-full')}
            />
            <InputGroupButton
              type="submit"
              variant="outline"
              size={styles.button}
              className="-mr-px box-content h-full rounded-r-full"
            >
              <Search />
            </InputGroupButton>
          </InputGroup>
        </PopoverAnchor>

        {showSuggestions && (suggestions.length > 0 || isLoading) && (
          <PopoverContent
            className="w-(--radix-popover-trigger-width) rounded-xl p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <ul className="bg-popover text-popover-foreground w-full overflow-hidden">
              {isLoading && suggestions.length === 0 ? (
                <li className="flex items-center justify-center px-4 py-4">
                  <Spinner />
                </li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      'cursor-pointer truncate px-4 py-2 transition-colors',
                      activeIndex === index
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    {suggestion}
                  </li>
                ))
              )}
            </ul>
          </PopoverContent>
        )}
      </Popover>
    </form>
  );
}
