export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  total: number;
};

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
