"use client";
import { useTransition, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SortField, SortOrder } from "@/lib/db/types";
import { useIntersection } from "@/src/hooks/useIntersection";
import { ProductGridSkeleton } from "@/src/components/ProductSkeleton";

export function LoadMore({
  hasMore,
  sortField,
  sortOrder,
  page,
}: {
  hasMore: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadingRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(loadingRef);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const nextPage = page + 1;
    const currentPage = Number(searchParams.get("page") || 1);
    if (isIntersecting && hasMore && nextPage > currentPage) {
      const newUrlSearchParams = new URLSearchParams({
        sort: sortField,
        order: sortOrder,
        page: nextPage.toString(),
      });

      startTransition(() => {
        router.push(`${pathname}?${newUrlSearchParams.toString()}`, {
          scroll: false,
        });
      });
    }
  }, [
    isIntersecting,
    hasMore,
    page,
    sortField,
    sortOrder,
    router,
    pathname,
    searchParams,
  ]);

  if (!hasMore) return null;

  return (
    <div ref={loadingRef} className="h-10">
      {isPending && <ProductGridSkeleton />}
    </div>
  );
}
