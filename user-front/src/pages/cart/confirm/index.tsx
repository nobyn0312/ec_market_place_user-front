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
import Image from "next/image";
import { HStack } from "@/components/HStack/Hstack";

const index = () => {

  const [cart, setCart] = useAtom(cartAtom);
  const [count, setCount] = useState(1);

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


  console.log(cart)

  const [totalState, setTotalState] = useState(0);

  const checkout = () => {
    console.log('完了');
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <>
      <Container>
        <Button onClick={checkout} shape="square" ><Link href="/cart/complete" style={{ textAlign: 'center', display: 'block', padding: '15px' }}>注文を確定する</Link></Button>

        <Typography size="md" font="bold">小計</Typography>

        <div style={{ border: '1px solid black' }}>
          <div>
            <div>商品の小計：</div>
            <div>¥{getTotal(cart)}</div>
            <div>配送料・手数料</div>
            <div>¥ 0</div>
            <div>ご請求金額</div>
            <div>{getTotal(cart)}</div>
          </div>
        </div>


        <Typography size="md" font="bold">注文の詳細</Typography>
        <table style={{ border: '1px solid #333' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th></th>
              <th>商品</th>
              <th>価格</th>
              <th>数量</th>
            </tr>
            {cart.map((x) => {
              return (
                <tr>
                  <td>
                    <Image
                      src={x.item.image}
                      alt="商品画像"
                      width={92}
                      height={92}
                    />
                  </td>
                  <td style={{ width: '40%' }}>{x.item.name}</td>
                  <td>¥{x.item.price}</td>
                  <td style={{ width: '10%' }}>{x.count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* <div>
          <div></div>
          <div>商品</div>
          <div>価格</div>
          <div>数量</div>

          {cart.map((x) => {
            return (
              <HStack spacing="md" style={{border:'1px solid #333'}}>
                <div>
                  <Image
                    src={x.item.image}
                  alt="商品画像"
                  width={92}
                    height={92}
                    style={{borderRight:'1px solid #333333'}}
                  />
                </div>
                <div style={{width:'40%', borderRight:'1px solid #333'}}>{x.item.name}</div>
                <div>¥{x.item.price}</div>
                <div style={{ width: '10%'}}>{x.count}</div>
              </HStack>
            )
          })}
        </div> */}


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

        <Button onClick={checkout} shape="square" ><Link href="/cart/complete" style={{ textAlign: 'center', display: 'block', padding: '15px' }}>注文を確定する</Link></Button>
      </Container>
    </>
  )
};

export default index;
