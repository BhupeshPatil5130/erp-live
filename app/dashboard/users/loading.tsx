import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UsersLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4">
              <div className="flex items-center pb-4">
                <Skeleton className="h-5 w-24 mr-8" />
                <Skeleton className="h-5 w-32 mr-8" />
                <Skeleton className="h-5 w-16 mr-8" />
                <Skeleton className="h-5 w-24 mr-8" />
                <Skeleton className="h-5 w-16 mr-8" />
                <Skeleton className="h-5 w-24" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center py-4 border-t">
                  <Skeleton className="h-5 w-32 mr-8" />
                  <Skeleton className="h-5 w-40 mr-8" />
                  <Skeleton className="h-5 w-20 mr-8" />
                  <Skeleton className="h-5 w-32 mr-8" />
                  <Skeleton className="h-5 w-16 mr-8" />
                  <div className="flex ml-auto gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
