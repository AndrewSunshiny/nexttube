'use client';

import React, { useState } from 'react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from '~/components/ui/input-group';
import { cn } from '~/lib/utils';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
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
  onSearch,
  className,
  placeholder = 'Search',
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const styles = sizeStyles[size];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
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
