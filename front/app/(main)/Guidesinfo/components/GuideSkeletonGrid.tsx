const GuideSkeletonCard = () => (
  <div className="rounded-3xl border border-gray-200 shadow-md p-4 animate-pulse">
    <div className="h-40 bg-gray-200 rounded-2xl mb-4" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/3" />
  </div>
);

const GuideSkeletonGrid = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <GuideSkeletonCard key={i} />
    ))}
  </div>
);
export default GuideSkeletonGrid;
