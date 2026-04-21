import Feed from '~/components/feed/Feed';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || '';

  return (
    <div className="flex-1">
      <Feed query={query} />
    </div>
  );
}
