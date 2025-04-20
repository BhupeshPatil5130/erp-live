import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LSQEnquiryDetailsLoading() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-64" />
          </CardTitle>
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="p-4">
              <div className="flex border-b pb-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex-1">
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>

              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex py-4 border-b last:border-0">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div key={j} className="flex-1">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
