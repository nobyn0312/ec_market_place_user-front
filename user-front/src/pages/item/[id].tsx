import { FC, useState, useEffect } from "react";
import styles from './item.module.css'
import { Container } from '@/components/Container/Container'
import { Carousel } from '@/components/Carousel/Carousel';
import '@splidejs/splide/css';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { Shopname } from '@/components/Shopname/Shopname'
import shopthumb2 from '/public/shopthumb2.png'
import item1 from '/public/controller.png';
import item2 from '/public/controller_explanation1.png'
import item3 from '/public/controller_explanation2.png'
import { Item, ItemApi } from '../../../types/axios';
import Router, { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";


const details = () => {
  const itemApi = new ItemApi();

  const imagesArray = [
    item1.src,
    item2.src,
    item3.src
  ]

  const router = useRouter();
  const { id } = router.query;

  console.log({ id });
  console.log(id)


  const [itemState, setItemState] = useState<Item>();

  const { addCart } = useCart();

  const gameController = itemApi.getItems("items");

  console.log(gameController);



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
      <Carousel images={imagesArray} alt={"商品画像"} />

      <Container>
        <div className={styles.detailslider}>
        </div>
        <div className={styles.itemTitle}>
          <Typography size="lg">{itemState?.name}</Typography>
        </div>
        {/* <Typography size="lg" className={styles.star}>★★★★☆</Typography> */}
        <p className={styles.price}>¥{itemState?.price}</p>

        <div className={styles.cartButton}>
          <Button shape='rounded' onClick={(e)=> addCart(Item)}>カートに入れる</Button>
        </div>
        <p>取り扱いショップ</p>
        <Shopname shopname={'cio'} shopthumbnail={shopthumb2.src} shoppagelink={'../shop/details'} />

        <div>
          <Typography size="md" font="bold">【この商品の説明】</Typography>
          <ul style={{marginBottom:'24px'}}>
            <li style={{ marginBottom: '12px' }}>
              <Typography size="md">
                ・【多機能かつ便利な接続性！】Bluetoothと有線接続の両方に対応し、PC、Switch、Android、iOSなど、様々なプラットフォームに対応しています。さらに、 Bluetooth接続により、ワイヤレスでの利便性を享受しつつ、有線接続により安定したゲームプレイを実現できます。また、USBを使うことで、コントローラーを便利に充電し、常に準備が整った状態でゲームを楽しむことができます。
              </Typography>
            </li>
            <li>
              <Typography size="md">
                ・【多機能・使いやすい！ゲームプレイを最適化するアプリ】ゲームプレイを最適化するために様々な機能を調整可能です。ユーザーはボタン配置や振動強度などを自由にカスタマイズでき、ゲーム体験をより個人の好みに合わせられます。さらに、ダッシュボードから照明やプロファイル設定を手軽に変更可能で、広範囲なゲーム環境の構築が可能です。使いやすくて多機能なアプリとなり、多くのゲーマーにとって重宝されることでしょう。
              </Typography>
            </li>
          </ul>
        </div>

      </Container>
    </main>
  )
}

export default details;