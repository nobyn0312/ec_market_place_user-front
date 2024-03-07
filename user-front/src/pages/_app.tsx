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

export const cartAtom = atom<CartItem[]>([]);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}