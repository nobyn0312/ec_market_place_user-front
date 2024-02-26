import styles from '@/styles/Home.module.css'
import { ItemCard } from '@/components/ItemCard/ItemCard'
import { Container } from '@/components/Container/Container'
import item1 from '/public/item-list.png';
import item2 from '/public/item2_1.png'
import { Slider } from '@/components/Slider/Slider';
import { useState } from 'react';
// import useFetchItems from '@/hooks/useCart';
import { HStack } from '@/components/HStack/Hstack';
import ItemMap from '@/features/item/itemMap';

// const images = [
//   item1,
//   item2,
//   item1,
//   item2,
//   item1,
//   item2,
// ]

const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation(); // イベントの伝播を止める
  console.log('カートに追加')
}

export default function Search() {
  const shopId = 'ショップID'; // ショップIDを指定
  // const items = useFetchItems(shopId);

  return (
    <>
      <main className={`${styles.container}`}>
        <section className={styles.recommend}>
          <Container>
            <p className={styles.bold} style={{
              marginBottom: 16 , paddingTop:24}}>検索結果</p>
          <ul className={styles.recommend_list}>
              {/* {ItemMap} */}

            </ul>
            <HStack spacing="md" position="center">
            <button>前へ</button>
            <button>次へ</button>
          </HStack>
        </Container>
      </section>
    </main >
    </>
  )
}
