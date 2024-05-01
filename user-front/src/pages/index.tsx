import React, { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import { Container } from '@/components/Container/Container'
import { Item, ItemApi } from '../../types/axios';
import { ItemDescription } from "@/components/ItemDescription/ItemDescription";
import { Button } from "@/components/Button/Button";
import { useAtom } from "jotai";
import { cartAtom } from "@/pages/_app";
import Link from "next/link";
import { Slider } from "@/components/Slider/Slider";
import item1 from '/public/controller.png';
import item2 from '/public/earphone.png';
import item3 from '/public/mobileBattery.jpg';
import item4 from '/public/tablet.png'
import item5 from '/public/book.jpg'
import item6 from '/public/butamen.jpg'
import Image from "next/image";
import campaign from '/public/campaign.jpg'
import { Typography } from "@/components/Typography/Typography";
import { useCart } from "@/hooks/useCart";

export default function Home() {
  const itemApi = new ItemApi();
  // APIから商品情報受け取るためのstate
  const [mapState, setMapState] = useState<Item[]>([]);

  const imagesArray = [
    item1.src,
    item2.src,
    item3.src,
    item4.src,
    item5.src,
    item6.src
  ]

  //jotai
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await itemApi.getItems("items");
        setMapState(response.data);
        console.log(response);
      } catch (error) {
        console.error('商品一覧を取得できませんでした:', error)
      }
    }
    fetchItem()
  }, []);


  const { addCart } = useCart();


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await itemApi.getItems('items')
        setMapState(response.data)
      } catch (error) {
        console.error('商品一覧を取得できませんでした:', error)
      }
    }
    fetch()
  }, [])


  useEffect(() => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
    // console.log(cartJSON);
  }, [cart]);

  return (
    <>
      <main className={`${styles.container}`}>
        <section className={`${styles.history} ${styles.container_inner}`}>
          <p>チェックしたアイテム</p>
          <Slider images={imagesArray} />
        </section>

        <section className={styles.recommend}>
          <Container>
            <section className={styles.container}>

              <Typography size="md" style={{ marginBottom: '8px' }}>キャンペーン</Typography>
              <Image src={campaign} alt="campaign" width={350} style={{ margin: '0 auto 8px', display: 'block' }} />
              <Typography size="xl" textAlign="center">新生活応援アイテム多数！</Typography>
            </section>

            <ul className={styles.recommend_list} style={{ paddingTop: '32px' }}>
              {mapState.map((item) => (
                <li key={item.id} className={styles.card}>
                  <Link href={`/item/${item.id}`}>
                    <div style={{ width: 'auto', display: 'flex' }}>
                      <ItemDescription
                        image={item.image}
                        itemTitle={item.name}
                        price={item.price}
                      />
                    </div>
                    <div style={{ margin: '0 auto', width: 'fit-content' }}>
                    </div>
                  </Link>
                  <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <Button onClick={(event) => addCart(item)} shape="rounded">カートに追加</Button>
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
