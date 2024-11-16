export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type SortField = "price" | "name";
export type SortOrder = "asc" | "desc";

export interface ProductQueryOptions {
  page?: number;
  limit?: number;
  sortField?: SortField;
  sortOrder?: SortOrder;
}
