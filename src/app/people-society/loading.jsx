import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <main className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
          <BentoGridSkeleton />
        </div>
      </div>
    </main>
  );
}