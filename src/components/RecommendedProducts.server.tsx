import { getRecommendedProducts } from "@/lib/db/products";
import { ProductCard } from "./ProductCard";

export async function RecommendedProducts({
  productId,
}: {
  productId: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const recommendedProducts = await getRecommendedProducts(productId);

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
