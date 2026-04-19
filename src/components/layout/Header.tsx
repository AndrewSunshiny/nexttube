'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';
import SearchBar from '~/components/search/SearchBar';
import { ThemeToggle } from '~/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 flex h-14 items-center justify-between border-b px-4">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </Button>
        <Link href="/" className="group flex items-center">
          <span className="text-foreground text-xl font-bold tracking-tighter">
            NextTube
          </span>
        </Link>
      </div>

      {/* Search Section */}
      <div className="mx-4 flex max-w-2xl flex-1">
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {/* Profile/Upload placeholder can go here */}
      </div>
    </header>
  );
}
