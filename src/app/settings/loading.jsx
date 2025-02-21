export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="h-12 w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-12 w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-12 w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  );
}