import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import AddCart from '@/components/CartActions/AddCart'
import { Item } from '../../types/axios'


type CartItem = {
  id: string
  name: string
  price: number
}

type Props = {
  children: ReactNode
}

type InitialState = {
  cartState: CartItem[]
  setCartState: Dispatch<SetStateAction<CartItem[]>>
}

export const CartContext = createContext<CartItem[] | null>(null)

export const CartContextProvider = ({ children }: Props) => {
  const [cartState, setCartState] = useState<CartItem[]>([])

  // 全体で共有したいのはしたいのはカートの個数

  return (
    <CartContext.Provider value="cartPiece">
      {children}
    </CartContext.Provider>
  );
};

export default CartContext
