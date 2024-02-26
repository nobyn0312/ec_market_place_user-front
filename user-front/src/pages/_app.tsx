import '../styles/reset.css'
import '../styles/common.css'
import { atom, useAtom } from 'jotai'

import type { AppProps } from 'next/app'
import Layout from './layout/layout'
import { CartContextProvider } from '@/context/CartContext'
import CartContext from '@/context/CartContext'


const countAtom = atom(0)
export const incrementCountAction = atom(
  (get) => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) + 1),
);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}