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

const images = [
  item1,
  item2,
  item3
]


interface Props {
  name: string;
  price: string;
  key?:number
}



export const details: FC<Props> = ({name,price,key,...props}) => {
  console.log("あげ")
  const itemApi = new ItemApi();
  return (
    <>
      <main key={key}>
        <Carousel images={images} />
        <Container>
          <div className={styles.itermTitle}>
            <Typography>テストアイテム{name}</Typography>
          </div>
        </Container>
      </main>
    </>
  )
}
export default details