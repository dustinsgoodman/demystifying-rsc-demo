"use client";

import { CartState } from "@/lib/db/types";
import { createContext, useContext, useReducer } from "react";

type CartAction = { type: "UPDATE_CART"; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  updateCart: (payload: CartState) => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "UPDATE_CART": {
      return action.payload;
    }
    default:
      return state;
  }
}

export function CartProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: CartState;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const updateCart = (payload: CartState) => {
    dispatch({ type: "UPDATE_CART", payload });
  };

  return (
    <CartContext.Provider value={{ state, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
