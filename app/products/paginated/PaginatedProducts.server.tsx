import Link from "next/link";
import { getProducts } from "@/lib/db/products";
import { SortField, SortOrder } from "@/lib/db/types";
import { CONFIG } from "@/lib/config";

import { ProductCard } from "@/src/components/ProductCard";

export async function PaginatedProducts({
  sortField,
  sortOrder,
  page,
}: {
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
}) {
  const { products, total } = await getProducts({
    sortField,
    sortOrder,
    page,
  });

  const totalPages = Math.ceil(total / CONFIG.ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {pages.map((pageNum) => (
            <Link
              key={pageNum}
              href={`/products/paginated?page=${pageNum}&sort=${sortField}&order=${sortOrder}`}
              className={`px-4 py-2 rounded-md ${
                page === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
