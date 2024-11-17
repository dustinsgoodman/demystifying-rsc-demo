import { Suspense } from "react";
import { SortField, SortOrder } from "@/lib/db/types";
import { ProductSort } from "@/src/components/ProductSort.client";
import { PaginatedProducts } from "./PaginatedProducts.server";
import { ProductGridSkeleton } from "@/src/components/ProductSkeleton";

export default async function PaginatedProductsPage({
  searchParams,
}: {
  searchParams: { sort?: SortField; order?: SortOrder; page?: number };
}) {
  const paginationParams = await searchParams;
  const sortField = (paginationParams.sort || "name") as SortField;
  const sortOrder = (paginationParams.order || "asc") as SortOrder;
  const page = Number(paginationParams.page || 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductSort sortField={sortField} sortOrder={sortOrder} />
      </div>

      <Suspense
        key={`${sortField}-${sortOrder}-${page}`}
        fallback={<ProductGridSkeleton />}
      >
        <PaginatedProducts
          sortField={sortField}
          sortOrder={sortOrder}
          page={page}
        />
      </Suspense>
    </div>
  );
}
