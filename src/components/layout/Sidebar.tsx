import Link from 'next/link';
import { navLinkVariants } from '../ui/layout-variants';
import { cn } from '~/lib/utils';

const CATEGORIES = [
  { name: 'Home', icon: '🏠' },
  { name: 'Shorts', icon: '⚡' },
  { name: 'Subscriptions', icon: '📁' },
  { name: 'Library', icon: '📚' },
  { name: 'History', icon: '🕒' },
  { name: 'Your videos', icon: '🎬' },
  { name: 'Watch later', icon: '🕒' },
  { name: 'Liked videos', icon: '👍' },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-[calc(100vh-3.5rem)] w-60 flex-col overflow-y-auto border-r border-zinc-200 bg-white px-3 py-2 md:flex dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="flex flex-col gap-1">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            href="#"
            className={cn(navLinkVariants({ active: false }))}
          >
            <span className="text-lg">{category.icon}</span>
            {category.name}
          </Link>
        ))}
      </nav>
      <hr className="my-3 border-zinc-200 dark:border-zinc-800" />
      <nav className="flex flex-col gap-1">
        <div className="px-3 py-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Explore
        </div>
        <Link href="#" className={cn(navLinkVariants({ active: false }))}>
          <span className="text-lg">🔥</span> Trending
        </Link>
        <Link href="#" className={cn(navLinkVariants({ active: false }))}>
          <span className="text-lg">🎶</span> Music
          <span className="text-lg">🎮</span> Gaming
        </Link>
      </nav>
    </aside>
  );
}
