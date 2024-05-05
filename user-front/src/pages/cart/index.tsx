"use client"
import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'
import { Container } from '@/components/Container/Container';
import { useAtom } from "jotai/index";
import { cartAtom } from "@/pages/_app";
import { Item, ItemApi } from '../../../types/axios';
import { ItemDescription } from '@/components/ItemDescription/ItemDescription';
import { HStack } from '@/components/HStack/Hstack';
import { Button } from '@/components/Button/Button';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import { Typography } from '@/components/Typography/Typography';
import { getTotal } from '@/features/cart/getTotal';
import { useCart } from '@/hooks/useCart';
import AddCart from '@/components/CartActions/AddCart';

import { CartItem } from '@/pages/_app';

const Cart = (item: Item) => {

  // const count = cartAtom.count
  const [count, setCount] = useState(0);

  const { addCart, removeCart, decrementCart, cart } = useCart();



  const increment = (cartItem: CartItem) => {
    // setCount((x) => x + 1)
    console.log('プラス')
    addCart(cartItem.item);
  };




  const decrement = (cartItem: CartItem) => {
    console.log('マイナス')
    decrementCart(cartItem.item)
  }



  const [totalState, setTotalState] = useState(0);

  const goConfirm = () => {
    console.log('confirm');
  };

  return (
    <Container>
      <Typography size='xl' className={styles.totalPrice}>小計：¥{getTotal(cart)}</Typography>
      <div className={styles.confirmButton}>
        <Button shape='square' onClick={goConfirm}><Link style={{ textAlign: 'center', display: 'block', padding: '15px' }} href="/cart/confirm">レジに進む</Link></Button>
      </div>
      <ul className={styles.recommend_list} style={{ marginBottom: '12px' }}>
        {cart.map((x) => (
          <li className={styles.card} key={item.id} style={{ margin: '20px 0' }}>
            <Link href="#">
              <ItemDescription
                image={x.item.image}
                itemTitle={x.item.name}
                price={x.item.price}
              />
              <HStack spacing='md'>
                <HStack spacing='sm' position='left' style={{ border: '1px solid black' }}>
                  {/* mapで受け取っているxを渡している */}
                  <button className={styles.quantityBtn} onClick={() => decrement(x)}>-</button>
                  {x.count}
                  {/* mapで受け取っているxを渡している */}
                  <button className={styles.quantityBtn} onClick={() => increment(x)}>+</button>
                </HStack>
                <button className={styles.quantityBtn} onClick={() => removeCart(x.item.id)}>削除</button>
              </HStack>
            </Link>
            {/* <p>{count}</p> */}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Cart;