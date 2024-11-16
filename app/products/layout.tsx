import Link from "next/link";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            ← Back to Products Demo
          </Link>
        </div>
      </nav>
      {children}
    </main>
  );
}
