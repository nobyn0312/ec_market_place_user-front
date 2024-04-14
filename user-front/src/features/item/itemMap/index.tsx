// itemMap/index.tsx
import React, { useEffect, useState } from 'react';
import { ItemDescription } from '@/components/ItemDescription/ItemDescription';
import { Item, ItemApi } from '../../../../types/axios';
import AddCart from '@/components/CartActions/AddCart';
import styles from './itemmap.module.css'
import RemoveCart from '@/components/CartActions/RemoveCart';
import { Button } from '@/stories/Button';
import { cartAtom } from "@/pages/_app";
import { useAtom } from 'jotai';
import { Typography } from '@/components/Typography/Typography';


// export interface SwaggerItem {
//   id: number;
//   name: string;
//   image: string;
//   caption: string;
//   description: string;
//   price:  string;
//   stocks: number;
//   onSale: boolean;
//   deliveryDate: number;
//   isCartPage?: boolean
// }


const ItemMap = () => {
  const itemApi = new ItemApi();

  // const [items, setItems] = useState<SwaggerItem[]>([]);
  const [mapState, setMapState] = useState<Item[]>([]);



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

  const AddCart = (item: Item) => {
    setCart(() => {
      const newCartState = cart.map(cartItem => {
        if (cartItem.item.id === item.id) {
          // 追加されるitemがすでにcartに含まれているなら、cartに入っている個数を1足す
          console.log(cart)
          return { item: cartItem.item, count: cartItem.count + 1 }
        } else {
          // 関係のないcartItemは何も変化はない
          return cartItem;
        }
      })
      // 追加されるitemがcartに含まれていないなら、cartに新規にitemを個数1で追加する
      if (newCartState.findIndex(cartItem => cartItem.item.id === item.id) === -1) {
        newCartState.push({ item: item, count: 1 })
      }
      return newCartState;
    })
  };

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
      {/* {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <ItemDescription
            image={item.image}
            itemTitle={item.name}
            price={item.price}
          />
          <div style={{margin:'0 auto',width:'fit-content'}}>
          </div>
          <div style={{ padding: '0 16px' ,marginBottom:'16px'}}>
            <div style={{ padding: '0 16px', marginBottom: '16px' }}>
              <Button onClick={(e) => AddCart(item)} shape="rounded">カートに追加</Button>
            </div>
          </div>
        </div>
      ))} */}
      <Typography>テスト</Typography>
    </>
  );
};

export default ItemMap;