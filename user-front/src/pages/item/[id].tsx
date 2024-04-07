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
import { Item, ItemApi, ShopApi } from '../../../types/axios';
import Router, { useRouter } from "next/router";


const details = () => {
  const itemApi = new ItemApi();

  const images = [
    item1,
    item2,
    item3
  ]

  const router = useRouter();
  const { id } = router.query;

  console.log(id)


  const [itemState, setItemState] = useState<Item>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await itemApi.getItemById('', ItemApi.name); // shopId を空文字列に設定する
        setItemState(response.data);
        console.log(response.data.name);
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
        <div className={styles.itemTitle}>
          <Typography>{itemState?.name}</Typography>
          <Typography>{itemState?.price}</Typography>
        </div>
      </Container>
    </main>
  )
}

export default details;