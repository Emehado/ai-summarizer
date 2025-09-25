import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  _count: {
    Review: number;
  };
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-lg p-0"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
          <img
            src={`https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description || 'No description available'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Badge variant="secondary">
          {product._count.Review}{' '}
          {product._count.Review === 1 ? 'Review' : 'Reviews'}
        </Badge>
      </CardFooter>
    </Card>
  );
}
