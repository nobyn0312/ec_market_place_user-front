import { FC, useState, useContext, useEffect } from "react";
import styles from './item.module.css'
import { Container } from '@/components/Container/Container'
import { Carousel } from '@/components/Carousel/Carousel';
import '@splidejs/splide/css';
import { Button } from '@/components/Button/Button';
import { HStack } from '@/components/HStack/Hstack';
import { Typography } from '@/components/Typography/Typography';
import { Shopname } from '@/components/Shopname/Shopname'
import shopthumb2 from '/public/shopthumb2.png'
import Image from 'next/image';
import item1 from '/public/controller.png';
import item2 from '/public/controller_explanation1.png'
import item3 from '/public/controller_explanation2.png'
import { Item, ItemApi } from '../../../types/axios';
import Router, { useRouter } from "next/router";


const details = () => {
  const itemApi = new ItemApi();
  const router = useRouter();
  const { id } = router.query;
  console.log(id); // URLから取得したidを出力

  const images = [
    item1,
    item2,
    item3
  ]

  const [itemState, setItemState] = useState<Item>();

  useEffect(() => {
    console.log('テスト')
    const fetch = async () => {
      try {
        const response = await itemApi.getItemById('', ''); // shopId を空文字列に設定する
        setItemState(response.data);
        console.log(response);
      } catch (error) {
        console.error('取得できません:', error)
      }
    }
    fetch();
  }, []);

  return (
    <main>
      <Carousel images={images} />
      <Container>
        <div className={styles.itermTitle}>
          <Typography>テストアイテム{id}</Typography>
        </div>
      </Container>
    </main>
  )
}

export default details;