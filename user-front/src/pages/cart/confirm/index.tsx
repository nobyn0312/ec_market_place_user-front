import { Container } from "@/components/Container/Container";
import TableBox from "@/components/TableBox/TableBox";
import React, { useState } from "react";
import styles from '../cart.module.css'
import { Button } from "@/components/Button/Button";
import { useRouter } from 'next/router';
import Cart from "..";
import { cartAtom } from "@/pages/_app";
import { useAtom } from "jotai";
import { getTotal } from "@/features/cart/getTotal";
import { Typography } from "@/components/Typography/Typography";
import Link from "next/link";

const index = () => {

  const [cart, setCart] = useAtom(cartAtom);
  const [count, setCount] = useState(1);

  console.log(cart)
  const router = useRouter();

  const handleConfirmOrder = () => {
    // ボタンがクリックされた際に /cart/complete へ遷移する
    router.push('/cart/complete');
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}/${month}/${day}`;
  console.log(formattedDate);
  const arrivalDate = `${year}/${month}/${day + 2}`;
  console.log(arrivalDate);

  return (
    <>
      <Container>
        <Button shape="square" ><Link href="/cart/complete" style={{ textAlign: 'center', display: 'block', padding: '15px' }}>注文を確定する</Link></Button>

        <Typography size="md" font="bold">小計</Typography>

        <table style={{ border: '1px solid black' }}>
          <tbody>
            <tr>
              <th>商品の小計</th>
              <td>{getTotal(cart)}</td>
            </tr>
            <tr>
              <th>配送料・手数料</th>
              <td>¥0</td>
            </tr>
            <tr>
              <th>ご請求金額</th>
              <td>{getTotal(cart)}</td>
            </tr>
          </tbody>
        </table>

        <Typography size="md" font="bold">注文の詳細</Typography>
        <table>
          <tbody>

          </tbody>
        </table>


        <div>
          <h2>お届け先</h2>
          <div className={styles.box}>
            <p>〒160-0023 東京都新宿区西新宿１丁目２３−７ 新宿ファーストウエスト 12F・17F </p>
          </div>
          <h2>お届け予定日</h2>
          <div className={styles.box}>
            <p>{arrivalDate}</p>
            <p>時間指定：なし</p>
            <p></p>
          </div>

          <h2>支払い方法</h2>
          <div className={styles.box}>
            <p>クレジットカード</p>
            <p>Visa 下4桁1111</p>
            <p></p>
          </div>

        </div>

        <Button shape="square" ><Link href="/cart/complete" style={{ textAlign: 'center', display: 'block', padding: '15px' }}>注文を確定する</Link></Button>
      </Container>
    </>
  )
};

export default index;
