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

const Cart = (item: Item) => {
  const [cart, setCart] = useAtom(cartAtom);

  // const count = cartAtom.count
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);



  const [totalState, setTotalState] = useState(0);

  const { removeCart } = useCart();

  // 小計を求める
  // let total = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   const item = cart[i].item;
  //   const count = cart[i].count;
  //   total += item.price * count;
  // }

  // console.log(total);


  const goConfirm = () => {
    console.log('confirm');
  };

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
                  <button className={styles.quantityBtn} onClick={decrement}>-</button>
                  {x.count}
                  <button className={styles.quantityBtn} onClick={increment}>+</button>
                </HStack>
                <button className={styles.quantityBtn} onClick={() => removeCart(x.item.id)}>削除</button>
              </HStack>
            </Link>
            <p>{count}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Cart;