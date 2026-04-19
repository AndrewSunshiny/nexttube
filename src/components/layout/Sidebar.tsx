import Link from 'next/link';
import { navLinkVariants } from '../ui/layout-variants';
import { cn } from '~/lib/utils';

const PRIMARY_NAV = [
  { name: 'Home', icon: '🏠', href: '/' },
  { name: 'Shorts', icon: '⚡', href: '/shorts' },
  { name: 'Subscriptions', icon: '📁', href: '/subscriptions' },
];

const LIBRARY_NAV = [
  { name: 'Library', icon: '📚', href: '/library' },
  { name: 'History', icon: '🕒', href: '/history' },
  { name: 'Your videos', icon: '🎬', href: '/your-videos' },
  { name: 'Watch later', icon: '🕒', href: '/watch-later' },
  { name: 'Liked videos', icon: '👍', href: '/liked-videos' },
];

const EXPLORE_NAV = [
  { name: 'Trending', icon: '🔥', href: '/trending' },
  { name: 'Music', icon: '🎶', href: '/music' },
  { name: 'Gaming', icon: '🎮', href: '/gaming' },
];

export default function Sidebar() {
  return (
    <aside className="border-border bg-background hidden h-[calc(100vh-3.5rem)] w-60 flex-col overflow-y-auto border-r px-3 py-2 md:flex">
      {/* Search Section */}
      <div className="mb-4 px-1">
        <div className="border-input focus-within:border-ring focus-within:ring-ring/50 relative flex items-center rounded-lg border bg-transparent px-2 py-1 text-sm transition-colors focus-within:ring-3">
          <span className="text-muted-foreground mr-2">🔍</span>
          <input
            placeholder="Search library..."
            className="placeholder:text-muted-foreground text-foreground w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Action Section */}
      <div className="mb-4 px-1">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span>Create</span>
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex flex-col gap-1">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(navLinkVariants({ active: false }))}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <hr className="border-border my-3" />

      {/* Library Section */}
      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
          Library
        </div>
        {LIBRARY_NAV.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(navLinkVariants({ active: false }))}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      <hr className="border-border my-3" />

      {/* Explore Section */}
      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
          Explore
        </div>
        {EXPLORE_NAV.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(navLinkVariants({ active: false }))}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
