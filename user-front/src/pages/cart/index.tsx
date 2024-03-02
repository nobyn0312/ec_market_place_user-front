"use client"
import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'
import { Button } from '@/components/Button/Button';
import { Container } from '@/components/Container/Container';
import { useAtom } from "jotai/index";
import { cartAtom } from "@/pages/_app";
import { Item, ItemApi } from '../../../types/axios';
import axios from 'axios';
import { ItemDescription } from '@/components/ItemDescription/ItemDescription';
import { HStack } from '@/components/HStack/Hstack';

const Cart = (item: Item) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [count, setCount] = useState(0);

  // const map = cart.reduce(
  //   (acc, curr) => acc.set(curr, (acc.get(curr) || 0) + 1),
  //   new Map()
  // );

  const removeCart = () => {
    console.log("rem");
  }

  useEffect(() => {
    //localstorageはレンダリング時には存在しない？のでuseeffectに入れる
    const cartItem = localStorage.getItem('cart');
    //JSON形式はそのままだと値を取り出せないのでparseで変換する
    const parsedCart = cartItem ? JSON.parse(cartItem) : [];
    setCart(parsedCart);
    //parsedCart.idだと値が取れなかったので、配列と番号を指定して取得
    for (var i = 0, l = parsedCart.length; i < l; i++) {
      console.log(parsedCart[i].id)
    }

  }, []);



  return (
    <Container>
      <ul className={styles.recommend_list} style={{ paddingTop: '32px' }}>
        {cart.map((item) => (
          <li className={styles.card} key={item.id}>
            {/* ここにアイテムの表示を行うコンポーネントを追加します */}
            <ItemDescription
              image={item.image}
              itemTitle={item.name}
              price={item.price}
            />
            <button onClick={removeCart}>削除</button>

            <HStack spacing='sm' position='left' style={{ alignItems: 'center' }}>
              <button onClick={() => setCount(cnt => cnt - 1)}>-</button>
              <p>{count}</p>
              <button onClick={() => setCount(cnt => cnt + 1)}>+</button>
            </HStack>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Cart;