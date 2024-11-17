import { Suspense } from "react";
import { getProduct } from "@/lib/db/products";
import { ProductDetails } from "@/src/components/ProductDetails.server";
import { RecommendedProducts } from "@/src/components/RecommendedProducts.server";
import { RecommendedProductsSkeleton } from "@/src/components/ProductSkeleton";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails productId={id} />

      <Suspense fallback={<RecommendedProductsSkeleton />}>
        <RecommendedProducts productId={id} />
      </Suspense>
    </div>
  );
}
