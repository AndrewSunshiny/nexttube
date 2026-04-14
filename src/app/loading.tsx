export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:p-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="flex animate-pulse flex-col gap-3">
          {/* Thumbnail Skeleton */}
          <div className="relative aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />

          {/* Details Skeleton */}
          <div className="flex gap-3">
            <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
