import '../styles/reset.css'
import '../styles/common.css'
import { atom, useAtom } from 'jotai'
import type { AppProps } from 'next/app'
import Layout from './layout/layout'

export const cartAtom = atom([]);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}