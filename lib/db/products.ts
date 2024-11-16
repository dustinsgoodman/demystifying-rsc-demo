import { CONFIG } from "../config";
import { Product, ProductQueryOptions } from "./types";

const BRANDS = [
  "Nordic Essence",
  "Urban Fleet",
  "Coastal Rhythm",
  "Mountain Echo",
  "City Pulse",
];

// Generate 50 products
const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `prod_${i + 1}`,
  name: `${["Shirt", "Pants", "Jacket", "Sweater", "Dress"][i % 5]} ${i + 1}`,
  brand: BRANDS[i % BRANDS.length],
  price: Math.floor(Math.random() * 150) + 50, // Random price between 50 and 200
  description: `A fantastic piece of clothing from ${
    BRANDS[i % BRANDS.length]
  }`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/${CONFIG.IMAGE_SIZE}`,
}));

async function delay() {
  await new Promise((resolve) => setTimeout(resolve, CONFIG.DB_DELAY));
}

export async function getProducts(options: ProductQueryOptions = {}) {
  await delay();

  const baseProducts = [...products];

  // Sort
  if (options.sortField) {
    const field = options.sortField;
    const order = options.sortOrder === "desc" ? -1 : 1;

    baseProducts.sort((a, b) => {
      if (field === "price") {
        return (a.price - b.price) * order;
      }
      return a[field].localeCompare(b[field]) * order;
    });
  }

  // Paginate
  const page = options.page || 1;
  const limit = options.limit || CONFIG.ITEMS_PER_PAGE;
  const start = (page - 1) * limit;
  const paginatedResults = baseProducts.slice(start, start + limit);

  return {
    products: paginatedResults,
    total: products.length,
    hasMore: start + limit < products.length,
  };
}

export async function getProduct(id: string) {
  await delay();
  return products.find((p) => p.id === id);
}

export async function getRecommendedProducts(productId: string, limit = 4) {
  await delay();
  const currentProduct = products.find((p) => p.id === productId);
  if (!currentProduct) return [];

  // Simple recommendation: same brand or similar price range
  return products
    .filter(
      (p) =>
        p.id !== productId &&
        (p.brand === currentProduct.brand ||
          Math.abs(p.price - currentProduct.price) < 30)
    )
    .slice(0, limit);
}
