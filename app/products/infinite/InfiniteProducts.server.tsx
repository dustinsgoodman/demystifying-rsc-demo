import { getProducts } from "@/lib/db/products";
import { SortField, SortOrder } from "@/lib/db/types";
import { ProductCard } from "@/src/components/ProductCard";
import { LoadMore } from "./LoadMore.client";

export async function ProductPage({
  page,
  sortField,
  sortOrder,
}: {
  page: number;
  sortField: SortField;
  sortOrder: SortOrder;
}) {
  const { products, hasMore } = await getProducts({
    sortField,
    sortOrder,
    page,
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <LoadMore
        hasMore={hasMore}
        sortField={sortField}
        sortOrder={sortOrder}
        page={page}
      />
    </>
  );
}
