import '../styles/reset.css'
import '../styles/common.css'
import { atom, useAtom, Provider as JotaiProvider } from 'jotai'; // Providerを追加
import type { AppProps } from 'next/app'
import Layout from './layout/layout'
import { Item } from '../../types/axios'

// export const cartAtom = atom([]);

type CartItem = {
  item: Item,
  count: number
}


// カートの状態管理
export const cartAtom = atom<CartItem[]>([]);

// 小計の状態管理
export const totalAtom = atom<number>(0);

// 配達日程の状態管理

// 商品の在庫状態管理

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}