import { Suspense } from "react";
import { SortField, SortOrder } from "@/lib/db/types";
import { ProductGridSkeleton } from "@/src/components/ProductSkeleton";
import { ProductPage } from "./InfiniteProducts.server";
import { ProductSort } from "@/src/components/ProductSort.client";

export default async function InfiniteProductsPage({
  searchParams,
}: {
  searchParams: { sort?: SortField; order?: SortOrder; page?: number };
}) {
  const paginationParams = await searchParams;
  const sortField = (paginationParams.sort || "name") as SortField;
  const sortOrder = (paginationParams.order || "asc") as SortOrder;
  const page = Number(paginationParams.page || 1);
  const pagesToShow = Array.from({ length: page - 1 }, (_, i) => i + 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductSort sortField={sortField} sortOrder={sortOrder} />
      </div>

      <Suspense key="products-1" fallback={<ProductGridSkeleton />}>
        <ProductPage page={1} sortField={sortField} sortOrder={sortOrder} />
      </Suspense>
      <Suspense key={`${sortField}-${sortOrder}-${page}`}>
        {pagesToShow.map((pageIndex) => (
          <ProductPage
            key={`products-${pageIndex}`}
            page={pageIndex}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        ))}
      </Suspense>
    </div>
  );
}
