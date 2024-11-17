import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/db/types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill={true}
          className="object-cover transition-transform group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 230px, (max-width: 1200px) 300px, 300px"
        />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-lg font-medium">${product.price}</p>
    </Link>
  );
}
