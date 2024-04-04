import { Container } from "@/components/Container/Container";
import TableBox from "@/components/TableBox/TableBox";
import React, { useState } from "react";
import styles from '../cart.module.css'
import { Button } from "@/components/Button/Button";
import { useRouter } from 'next/router';
import Cart from "..";
import { cartAtom } from "@/pages/_app";
import { useAtom } from "jotai";


const index = () => {

  const [cart, setCart] = useAtom(cartAtom);
  const [count, setCount] = useState(1);

  console.log(cart)
  const router = useRouter();

  const handleConfirmOrder = () => {
    // ボタンがクリックされた際に /cart/complete へ遷移する
    router.push('/cart/complete');
  };


  return (
    <>
      <Container>
        <Button shape="square" onClick={handleConfirmOrder}>注文を確定する</Button>

        <h1>注文確認画面</h1>
        <h2>小計：20,980</h2>



        <div>
          <h2>お届け先</h2>
          <div className={styles.box}>
            <p>〒160-0023 東京都新宿区西新宿１丁目２３−７ 新宿ファーストウエスト 12F・17F </p>
          </div>
          <h2>お届け予定日</h2>
          <div className={styles.box}>
            <p>9月8日</p>
            <p>時間指定：なし</p>
            <p></p>
          </div>

          <h2>支払い方法</h2>
          <div className={styles.box}>
            <p>クレジットカード</p>
            <p>Visa 下4桁1111</p>
            <p></p>
          </div>

          <h2>お届け予定日</h2>
          <div className={styles.box}>
            <p>9月8日</p>
            <p>時間指定：なし</p>
            <p></p>
          </div>

          <Button shape="square">注文を確定する</Button>

        </div>

      </Container>
    </>
  )
};

export default index;
