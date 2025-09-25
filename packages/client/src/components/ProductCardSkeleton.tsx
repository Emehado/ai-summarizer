import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-0">
        <Skeleton className="aspect-video rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-5 w-20" />
      </CardFooter>
    </Card>
  );
}