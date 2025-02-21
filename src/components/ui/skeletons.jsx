import { Skeleton } from "@/components/ui/skeleton";

export function HomeScreenSkeleton() {
  return (
    <div className="flex flex-col items-center justify-start pt-8 min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-[95vw] mx-auto">
        <div className="w-full max-w-[95%] sm:max-w-2xl space-y-6 sm:space-y-8 mx-auto">
        <div className="text-center space-y-4">
          <Skeleton className="h-[48px] sm:h-[72px] w-[150px] sm:w-[200px] mx-auto rounded-lg" />
          <Skeleton className="h-[24px] sm:h-[28px] w-[280px] sm:w-[448px] mx-auto rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full mx-auto rounded-xl" />
        <div className="mt-4 sm:mt-8 w-full max-w-[95vw] mx-auto overflow-hidden">
          <div className="flex gap-2 sm:gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-80 mx-2 sm:mx-4">
                <Skeleton className="h-[90px] sm:h-[104px] w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col space-y-3 bg-white dark:bg-gray-900 rounded-lg p-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );
}

export function BentoGridSkeleton() {
  return (
    <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-[95%] sm:max-w-7xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="row-span-1 rounded-xl p-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px] sm:w-[250px]" />
              <Skeleton className="h-4 w-[150px] sm:w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}