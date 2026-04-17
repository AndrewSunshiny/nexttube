'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';

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
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex flex-1 items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
          <Button type="submit" variant="outline" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Button>
        </form>
      </div>

      {/* Right Section (Placeholder for Profile/Upload) */}
      <div className="flex w-10 items-center gap-3">
        {/* To be implemented later */}
      </div>
    </header>
  );
}
