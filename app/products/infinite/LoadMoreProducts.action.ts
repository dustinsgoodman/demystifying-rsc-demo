"use server";

import { getProducts } from "@/lib/db/products";
import { SortField, SortOrder } from "@/lib/db/types";

export type LoadMoreProductsParams = {
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
};

export async function loadMoreProducts({
  sortField,
  sortOrder,
  page,
}: {
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
}) {
  return getProducts({
    sortField,
    sortOrder,
    page,
  });
}
