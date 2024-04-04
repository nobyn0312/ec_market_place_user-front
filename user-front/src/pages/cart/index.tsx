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

const Cart = (item: Item) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [count, setCount] = useState(1);


  // カートから削除
  const removeCart = (itemId: string) => {
    console.log("rem");
    console.log(cart)
    // console.log(cart[0].item.id)
    console.log(itemId)
    const updatedCart = cart.filter((deleteItem) => itemId !== deleteItem.item.id);
    setCart(updatedCart);
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

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
      <div className={styles.confirmButton}>
        <Button shape='square' onClick={goConfirm}><Link style={{ textAlign: 'center', display: 'block', padding: '15px' }} href="/cart/confirm">レジに進む</Link></Button>
      </div>
      <ul className={styles.recommend_list} style={{ marginBottom: '12px' }}>
        {cart.map((x) => (
          <li className={styles.card} key={item.id} style={{ margin: '20px 0' }}>
            <ItemDescription
              image={x.item.image}
              itemTitle={x.item.name}
              price={x.item.price}
            />
            <HStack spacing='md'>
              <HStack spacing='sm' position='left' style={{ border: '1px solid black' }}>
                <button className={styles.quantityBtn} onClick={() => setCount(count => count - 1)}>-</button>
                {x.count}
                <button className={styles.quantityBtn} onClick={() => { }}>+</button>
              </HStack>
              <button className={styles.quantityBtn} onClick={() => removeCart(x.item.id)}>削除</button>
            </HStack>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Cart;