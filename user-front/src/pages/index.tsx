import React, { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import { Container } from '@/components/Container/Container'
import { Item, ItemApi } from '../../types/axios';
import TableBox from '@/components/TableBox/TableBox';
import { ItemDescription } from "@/components/ItemDescription/ItemDescription";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import { useAtom } from "jotai";
import { incrementCountAction } from "@/pages/_app";
import Link from "next/link";



export default function Home() {

  // jotai カウント
  const [count, incrementCount] = useAtom(incrementCountAction);

  const itemApi = new ItemApi();

  // 空のカートの初期値
  const [cartState, setCartState] = useState<Item[]>([]);

  // APIから商品情報受け取るためのstate
  const [mapState, setMapState] = useState<Item[]>([]);



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
    console.log(item);
    setCartState((inCart) => {
      const newCartState = [...cartState, item];
      console.log(newCartState);
      // カートの状態をサーバーにポスト
      axios.post('http://localhost:3000/cart/', newCartState) // 適切なエンドポイントを指定してください
        .then(response => {
          console.log('カートの状態をサーバーにポストしました:', response.data);
        })
        .catch(error => {
          console.error('カートの状態をサーバーにポストできませんでした:', error);
        });

      return newCartState;
    })

  };


  return (
    <>
      <main className={`${styles.container}`}>
        <section className={styles.recommend}>
          <Container>

            <p>カウント：{count}</p>
            <button onClick={incrementCount}>ボタン</button>
            {/* ここからカートページに行かないと、ｋ */}
            <Link className={"text-cyan-600 underline"} href={"/cart"}>Cartページ</Link>

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
