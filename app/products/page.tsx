import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href="/products/infinite"
          className="block p-6 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Infinite Scroll</h2>
          <p className="text-gray-600">
            Browse products with an infinite scroll pattern. Products load
            automatically as you scroll down the page.
          </p>
        </Link>

        <Link
          href="/products/paginated"
          className="block p-6 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Paginated</h2>
          <p className="text-gray-600">
            Browse products with simple &ldquo;Pagination&rdquo;. Requires the
            user to navigate to the different pages.
          </p>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Demo Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Server-side sorting</li>
          <li>Suspense boundaries for loading states</li>
          <li>Server Components for data fetching</li>
          <li>Client Components for interactivity</li>
          <li>Artificial delay to simulate real-world conditions</li>
        </ul>
      </div>
    </div>
  );
}
