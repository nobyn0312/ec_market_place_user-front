"use client"
import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'
import { Button } from '@/components/Button/Button';
import { Container } from '@/components/Container/Container';
// import CartState from '@/components/cart/CartState';
// import CartContext from '@/context/CartContext';
import { useAtom } from "jotai/index";
import { incrementCountAction } from "@/pages/_app";


import {Item , ItemApi } from '../../../types/axios';


import ItemMap from '@/features/item/itemMap';
import axios from 'axios';

const itemApi = new ItemApi();

const Cart = () => {
  const [count, incrementCount] = useAtom(incrementCountAction);
  // const { cartState, setCartState } = useContext(CartContext);


  // useEffect(() => {
  //   console.log(cartState);
  // }, [cartState]);

  // 受け取る側の設定
  axios.get("localhost:3000/cart")
  .then(response => {
    setPosts(response.data);
  })
    .catch(() => {
      console.log("通信に失敗しました。")
    })

  return (
    <Container>
      <div><p>カートのページ</p>

        {/* <button className={"px-3 py-1.5 rounded bg-green-700 text-white"} onClick={incrementCount}>Count Up</button> */}
        <p>count: {count}</p>
      </div>
    </Container>
  );
};

export default Cart;