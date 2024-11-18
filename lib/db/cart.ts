"use server";

import { CartItem, CartState } from "@/lib/db/types";

let cart: CartState = {
  items: [],
  total: 0,
};

export async function getCartState(): Promise<CartState> {
  return cart;
}

export async function addItemToCart(payload: CartItem) {
  const existingItem = getExistingCartItem(payload.product.id);

  if (existingItem) {
    console.log("existingItem", existingItem);
    cart = {
      ...cart,
      items: cart.items.map((cartItem) =>
        cartItem.product.id === payload.product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + payload.quantity,
            }
          : cartItem
      ),
      total: cart.total + payload.product.price * payload.quantity,
    };
    return cart;
  }

  cart = {
    ...cart,
    items: [
      ...cart.items,
      {
        product: payload.product,
        quantity: payload.quantity,
      },
    ],
    total: cart.total + payload.product.price * payload.quantity,
  };
  return cart;
}

export async function removeItemFromCart(payload: CartItem) {
  const existingItem = getExistingCartItem(payload.product.id);
  if (!existingItem) {
    return cart;
  }

  cart = {
    ...cart,
    items: cart.items.filter((i) => i.product.id !== payload.product.id),
    total: cart.total - existingItem?.product.price * existingItem.quantity,
  };
  return cart;
}

export async function updateCartState(state: CartState) {
  cart = state;
}

function getExistingCartItem(productId: string) {
  return cart.items.find((i) => i.product.id === productId);
}
