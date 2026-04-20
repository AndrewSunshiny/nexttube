'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from '~/components/ui/input-group';
import { cn } from '~/lib/utils';
import { Search } from 'lucide-react';

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

export default function SearchBar({
  className,
  placeholder = 'Search',
  size = 'md',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const styles = sizeStyles[size];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full items-center gap-2', className)}
    >
      <InputGroup className={cn(styles.group, 'rounded-full')}>
        <InputGroupInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(styles.input, 'rounded-full')}
        />
        <InputGroupButton
          variant="outline"
          size={styles.button}
          className="-mr-px box-content h-full rounded-r-full"
        >
          <Search />
        </InputGroupButton>
      </InputGroup>
    </form>
  );
}
