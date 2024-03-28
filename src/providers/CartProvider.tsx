import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  deleteItem: (itemId: string) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  deleteItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  //se ja existir um item igual no carrinho, atualizar a quantidade
  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product_id: product.id,
      product,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  //pode adicionar ou remover quantidade do item pelos icones.
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // console.log(items);

  //função para realizar os calculos dos valores dos pedidos.
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const deleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
