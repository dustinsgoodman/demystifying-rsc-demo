import { getProduct } from "@/lib/db/products";
import Image from "next/image";

export async function ProductDetails({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  if (!product) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill={true}
          className="object-cover rounded-lg"
          priority={true}
          sizes="(max-width: 768px) 230px, (max-width: 1200px) 300px, 300px"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-600">{product.brand}</p>
        <p className="text-2xl font-semibold">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
