"use client";

import { useRouter, usePathname } from "next/navigation";
import { SortField, SortOrder } from "@/lib/db/types";

interface ProductSortProps {
  sortField: SortField;
  sortOrder: SortOrder;
}

export function ProductSort({ sortField, sortOrder }: ProductSortProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      className="border rounded-md px-3 py-2"
      value={`${sortField}-${sortOrder}`}
      onChange={(e) => {
        const [field, order] = e.target.value.split("-") as [
          SortField,
          SortOrder
        ];
        router.push(`${pathname}?sort=${field}&order=${order}`);
      }}
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
    </select>
  );
}
