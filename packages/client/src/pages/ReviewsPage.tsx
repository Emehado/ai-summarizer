import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Sparkles, AlertCircle, Star } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
}

interface ReviewsResponse {
  reviews: Review[];
  summary?: string;
}

async function fetchReviews(productId: string): Promise<ReviewsResponse> {
  const response = await axios.get(`/api/products/${productId}/reviews`);
  return response.data;
}

async function summarizeReviews(
  productId: string,
): Promise<{ summary: string }> {
  const response = await axios.post(
    `/api/products/${productId}/reviews/summarize`,
  );
  return response.data;
}

const ReviewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviews(id!),
    enabled: !!id,
  });

  const summarizeMutation = useMutation({
    mutationFn: () => summarizeReviews(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      setSummaryError(null);
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { error?: string } } };
      const message =
        axiosError.response?.data?.error || 'Failed to generate summary';
      setSummaryError(message);
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load reviews. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { reviews, summary } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Reviews Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Reviews</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </Badge>
          {reviews.length > 0 && (
            <Button
              onClick={() => summarizeMutation.mutate()}
              disabled={summarizeMutation.isPending}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {summarizeMutation.isPending
                ? 'Generating...'
                : 'Summarize Reviews'}
            </Button>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {(summary || summaryError) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{summaryError}</AlertDescription>
              </Alert>
            ) : (
              <>
                <p className="whitespace-pre-wrap">{summary}</p>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No reviews yet for this product.
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="mt-3 text-sm">{review.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
