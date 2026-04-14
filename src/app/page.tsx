import Feed from '~/components/feed/Feed';
import videos from '~/mocks/videos.json';

export default function Home() {
  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      <Feed videos={videos} />
    </main>
  );
}
