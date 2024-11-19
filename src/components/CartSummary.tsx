"use client";
import { useCart } from "@/src/context/cart";
// import { CartState } from "@/lib/db/types";

export function CartSummary(/*{ cart }: { cart: CartState } */) {
  const { state } = useCart();
  const itemCount = state.items.reduce<number>(
    // const itemCount = cart.items.reduce<number>(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600">Cart</span>
      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
        {itemCount}
      </span>
      <span className="text-gray-600">${state.total.toFixed(2)}</span>
    </div>
  );
}
