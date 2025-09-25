import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  _count: {
    Review: number;
  };
}

interface ProductsResponse {
  products: Product[];
}

async function fetchProducts(): Promise<ProductsResponse> {
  const response = await axios.get('/api/products');
  return response.data;
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

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
      <h1 className="mb-8 text-3xl font-bold">Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : data?.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}/reviews`)}
              />
            ))}
      </div>

      {data?.products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
