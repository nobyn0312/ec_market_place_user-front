import { cartAtom } from '@/pages/_app'
import { useAtom } from 'jotai'
import React from 'react'
import { Item } from '../../types/axios'

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom)

  // カート追加機能
  const addCart = (item: Item) => {
    setCart(() => {
      const newCartState = cart.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          console.log(cart)
          return { item: cartItem.item, count: cartItem.count + 1 }
        } else {
          return cartItem
        }
      })
      if (newCartState.findIndex((cartItem) => cartItem.item.id === item.id) === -1) {
        newCartState.push({ item: item, count: 1 })
      }
      return newCartState
    })
  }

  // カート削除機能
  const removeCart = (itemId: string) => {
    console.log('rem')
    console.log(cart)
    console.log(itemId)
    const updatedCart = cart.filter((deleteItem) => itemId !== deleteItem.item.id)
    setCart(updatedCart)
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const totalPrice = () => {

  }

  return { addCart, removeCart } // AddCartとremoveCartも必要に応じて追加することができます
}
