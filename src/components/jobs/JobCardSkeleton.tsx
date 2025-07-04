export default function JobCardSkeleton() {
  return (
    <div className="bg-card w-full animate-pulse cursor-pointer rounded-lg border p-3 lg:p-4">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Company Logo Skeleton */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700"></div>

        {/* Job Details Skeleton */}
        <div className="min-w-0 flex-1">
          <div className="lg:flex lg:items-center lg:gap-4">
            {/* Job Details - Left Column */}
            <div className="mb-2 min-w-0 flex-1 lg:mb-0">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Location - Middle Column (Hidden on mobile) */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <div className="mb-2 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Salary - Right Column */}
            <div className="flex-shrink-0 lg:text-right">
              <div className="mb-2 h-4 w-20 rounded bg-gray-200 lg:ml-auto dark:bg-gray-700"></div>
              <div className="h-3 w-16 rounded bg-gray-200 lg:ml-auto dark:bg-gray-700"></div>
            </div>
          </div>

          {/* Mobile: Location skeleton below */}
          <div className="mt-2 flex items-center gap-1 lg:hidden">
            <div className="h-3 w-3 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Mobile: Chevron skeleton */}
        <div className="lg:hidden">
          <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
