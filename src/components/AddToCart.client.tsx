"use client";
import { useState, useTransition } from "react";
import { useCart } from "@/src/context/cart";
import { Product } from "@/lib/db/types";
import { addItemToCart, removeItemFromCart } from "@/lib/db/cart";

export function AddToCart({ product }: { product: Product }) {
  const { updateCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) return 1;
      return prevQuantity - 1;
    });
  };

  const handleAddToCart = async () => {
    setAdded(true);
    setQuantity(1);
    startTransition(async () => {
      const updatedCart = await addItemToCart({ product, quantity });
      updateCart(updatedCart);
      setTimeout(() => setAdded(false), 1000);
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const updatedCart = await removeItemFromCart({ product, quantity });
      updateCart(updatedCart);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrementQuantity}
        className="text-lg bg-black text-white rounded-full w-10 h-10"
      >
        -
      </button>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="text-lg w-16 text-right border border-black rounded-md"
      />
      <button
        onClick={incrementQuantity}
        className="text-lg bg-black text-white rounded-full w-10 h-10"
      >
        +
      </button>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="text-lg bg-blue-500 disabled:opacity-50 text-white rounded-md px-4 py-1"
      >
        {added || isPending ? "Added to Cart!" : "Add to cart"}
      </button>
      <button
        onClick={handleRemoveFromCart}
        disabled={isPending}
        className="text-lg bg-red-500 disabled:opacity-50 text-white rounded-md px-4 py-1"
      >
        Remove from cart
      </button>
    </div>
  );
}
