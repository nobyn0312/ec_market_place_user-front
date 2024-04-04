import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import AddCart from '@/components/CartActions/AddCart'

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
  addCart: (item: CartItem) => void
  removeCart: (itemName: string) => void
}

export const CartContext = createContext<CartItem[] | null>(null)

export const CartContextProvider = ({ children }: Props) => {
  const [cartState, setCartState] = useState<CartItem[]>([])

  // 追加
  const addCart = (item: CartItem) => {
    setCartState((prevCart) => [...prevCart, item])
  }

  // 削除
  const removeCart = (itemName: string) => {
    const updatedCart = cartState.filter((item) => item.name !== itemName)
    setCartState(updatedCart)
  }

  const contextValue: InitialState = {
    cartState,
    setCartState,
    addCart,
    removeCart,
  }

  // return (
  //   <CartContext.Provider value={contextValue}>
  //     {children}
  //   </CartContext.Provider>
  // );
}

export default CartContext
