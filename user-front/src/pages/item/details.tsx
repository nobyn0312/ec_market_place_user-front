import React from 'react'
import styles from './item.module.css'
import { Container } from '@/components/Container/Container'
import { Carousel } from '@/components/Carousel/Carousel';
// import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; // デフォルトのテーマを読み込んでいます（コアスタイルのみ読み込む設定も可能）
import shopthumb1 from '/public/sampleshop.png'
import { Button } from '@/components/Button/Button';
import { HStack } from '@/components/HStack/Hstack';
import { Typography } from '@/components/Typography/Typography';
import { Shopname } from '@/components/Shopname/Shopname'

import shopthumb2 from '/public/shopthumb2.png'
import Image from 'next/image';
import item1 from '/public/item2_1.png';
import item2 from '/public/item2_2.png'
import item3 from '/public/item2_3.png'


const images = [
  item1,
  item2,
  item3
]


export const details = () => {
  return (
    <>
      <main>
        <Carousel images={images} />
        <Container>
          <div className={styles.detailslider}>

          </div>
          <div className={styles.itermTitle}>
            <Typography>Logicool G ゲームパッド コントローラー F310r PC ゲーム 有線 usb FF14 Windows 版 国内正規品 【 ファイナルファンタジーXIV 推奨周辺機器 】</Typography>
          </div>
          <Typography>★★★★☆</Typography>
          <p className={styles.price}>￥2,980</p>
          <div className={styles.cartButton}>
            <Button shape='rounded'>カートに入れる</Button>
          </div>

          <p>取り扱いショップ</p>
          <Shopname shopname={'cio'} shopthumbnail={shopthumb2.src} shoppagelink={'../shop/details'} />
        </Container>
      </main>
    </>
  )
}
export default details