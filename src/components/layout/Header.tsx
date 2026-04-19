'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';
import SearchBar from '~/components/search/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
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
          <span className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">
            NextTube
          </span>
        </Link>
      </div>

      {/* Search Section */}
      <div className="mx-4 flex max-w-2xl flex-1">
        <SearchBar />
      </div>

      {/* Right Section (Placeholder for Profile/Upload) */}
      <div className="flex w-10 items-center gap-3">
        {/* To be implemented later */}
      </div>
    </header>
  );
}
