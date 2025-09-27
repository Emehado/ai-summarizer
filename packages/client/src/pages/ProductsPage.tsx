import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const ProductsPage = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(trpc.getProducts.queryOptions());

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Products ({products?.length})</h1>
      <div>{products?.[0].description}</div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}/reviews`)}
              />
            ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
