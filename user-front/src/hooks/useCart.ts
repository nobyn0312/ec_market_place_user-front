import { cartAtom } from '@/pages/_app'
import { useAtom } from 'jotai'
import React, {useEffect} from 'react'
import { Item } from '../../types/axios'

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom)

  // 最初にlocalStorageに保存されている情報を取得。pages/cart/index.tsxから移動
  useEffect(() => {
    const cartItem = localStorage.getItem('cart');
    //JSON形式はそのままだと値を取り出せないのでparseで変換する
    const parsedCart = cartItem ? JSON.parse(cartItem) : [];
    setCart(parsedCart);
    //parsedCart.idだと値が取れなかったので、配列と番号を指定して取得
    for (var i = 0, l = parsedCart.length; i < l; i++) {
      console.log(parsedCart[i].id);
    }
  }, []);

  // カートの中身が変更したらlocalStorageにセット。pages/index.tsxから移動してきた
  useEffect(() => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
    // console.log(cartJSON);
  }, [cart]);

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

  // カートのカウントを一つ減らす機能
  const decrementCart = (item: Item) => {
    setCart(() => {
      return cart.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          console.log(cart)
          return { item: cartItem.item, count: Math.max(cartItem.count - 1, 0) }
        } else {
          return cartItem
        }
      })
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

  // カート追加、カート数１減らす、カート削除の関数と、cartの内容を返す
  return { addCart, decrementCart, removeCart, cart } // AddCartとremoveCartも必要に応じて追加することができます
}
