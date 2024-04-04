import { Container } from '@/components/Container/Container'
import React from 'react'

import shopThumb2 from '/public/shopthumb2.png'
import { Button } from '@/components/Button/Button'
import ItemMap from '@/features/item/itemMap'

import AddCart from '@/components/CartActions/AddCart';
import RemoveCart from '@/components/CartActions/RemoveCart';
// import { CartContextProvider } from '@/context/CartContext';

import styles from './index.module.css'
import { Typography } from '@/components/Typography/Typography'

const index = () => {
  return (
    <>
      <img src={shopThumb2.src} width={'390px'} height={'100%'} alt={'shopThumb'} style={{ margin: '0 auto', display: 'block' }} />
      <Container>
        <Button shape={'square'}>お気に入り追加</Button>
        <Typography size='md'>商品一覧</Typography>
        <ItemMap />
      </Container>
    </>
  )
}

export default index