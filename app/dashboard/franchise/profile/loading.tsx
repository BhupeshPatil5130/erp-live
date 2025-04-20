import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-10 w-80" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-48 mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-48 mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-48 mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-48 mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-6" />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-48 mt-1" />
                <Skeleton className="h-5 w-40 mt-1" />
                <Skeleton className="h-5 w-36 mt-1" />
              </div>
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-48 mt-1" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-48 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
