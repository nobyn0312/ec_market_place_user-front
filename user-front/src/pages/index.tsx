import React, { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import { Container } from '@/components/Container/Container'
import { Item, ItemApi } from '../../types/axios';
import { ItemDescription } from "@/components/ItemDescription/ItemDescription";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import { useAtom } from "jotai";
import { cartAtom } from "@/pages/_app";
import Link from "next/link";

export default function Home() {
  const itemApi = new ItemApi();
  // APIから商品情報受け取るためのstate
  const [mapState, setMapState] = useState<Item[]>([]);
  //jotai
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await itemApi.getItems("items");
        setMapState(response.data);
      } catch (error) {
        console.error('商品一覧を取得できませんでした:', error)
      }
    }
    fetch()
  }, []);


  const AddCart = (item: Item) => {
    setCart(() => {
      const newCartState = [...cart, item];
      return newCartState;
    })
    console.log("追加");
    //もしidが同じなら コントローラー
    if (item.id === "0918f2af-5721-478c-ae7d-531323141431") {
      console.log("sameItem");
    } else if (item.id !== item.id) {
      console.log("diff");
    }
  };
  useEffect(() => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
    // console.log(cartJSON);
  }, [cart]);


  return (
    <>
      <main className={`${styles.container}`}>
        <section className={styles.recommend}>
          <Container>
            <ul className={styles.recommend_list} style={{ paddingTop: '32px' }}>
              {mapState.map((item) => (
                <li key={item.id} className={styles.card}>
                  <ItemDescription
                    image={item.image}
                    itemTitle={item.name}
                    price={item.price}
                  />
                  <div style={{ margin: '0 auto', width: 'fit-content' }}>
                  </div>
                  <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <Button onClick={(event) => AddCart(item)} shape="rounded">カートに追加</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
    </>
  )
}
