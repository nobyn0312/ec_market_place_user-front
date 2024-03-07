// itemMap/index.tsx
import React, { useEffect, useState } from 'react';
import { ItemDescription } from '@/components/ItemDescription/ItemDescription';
import { ItemApi } from '../../../../types/axios';
import AddCart from '@/components/CartActions/AddCart';
import styles from './itemmap.module.css'
import RemoveCart from '@/components/CartActions/RemoveCart';

export interface SwaggerItem {
  id: number;
  name: string;
  image: string;
  caption: string;
  description: string;
  price:  string;
  stocks: number;
  onSale: boolean;
  deliveryDate: number;
  isCartPage?: boolean
}


const ItemMap = () => {
  const itemApi = new ItemApi();
  const [items, setItems] = useState<SwaggerItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemApi.getItems(ItemApi);
        setItems(response.data);
      } catch (error) {
        console.error('商品一覧を取得できませんでした:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <ItemDescription
            image={item.image}
            itemTitle={item.name}
            price={item.price}
          />
          <div style={{margin:'0 auto',width:'fit-content'}}>
            {/* <RemoveCart /> */}
          </div>
          <div style={{ padding: '0 16px' ,marginBottom:'16px'}}>
            {/* <AddCart item={item} /> */}
            <AddCart item={item} />

          </div>
        </div>
      ))}
    </>
  );
};

export default ItemMap;