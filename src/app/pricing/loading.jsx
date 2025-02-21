export default function Loading() {
  return (
    <div className="relative isolate px-6 pt-4 lg:px-8">
      {/* Header Loading */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mx-auto" />
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mx-auto" />
        <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mx-auto" />
      </div>

      {/* Pricing Cards Loading */}
      <div className="mx-auto mt-6 grid max-w-lg grid-cols-1 items-center gap-y-4 sm:gap-y-0 lg:max-w-3xl lg:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 sm:p-8 ${
              index === 1 ? 'bg-white/90 dark:bg-gray-800/90 shadow-2xl' : 'bg-white/60 dark:bg-gray-800/60 sm:mx-8 lg:mx-0'
            }`}
          >
            {/* Plan Name */}
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            
            {/* Price */}
            <div className="mt-4 flex items-baseline gap-x-2">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
            
            {/* Description */}
            <div className="mt-4 h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            
            {/* Features */}
            <div className="mt-6 space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-x-3 items-center">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
            
            {/* Button */}
            <div className="mt-6 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}