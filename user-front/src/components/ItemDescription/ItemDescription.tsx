import { FC, useState, useContext, useEffect } from "react";
import styles from "./ItemDescription.module.css";
import { HStack } from "../HStack/Hstack";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  variant?: 'itemlist' | 'cart',
  isCartCard?: boolean
  isShoplist?: boolean
  itemTitle: string
  price: string | number
  star?: string
  isSearch?: boolean
  className?: string;
  key?: number;
  image: HTMLImageElement | string
}

export const ItemDescription: FC<Props> = ({ variant, isCartCard, isShoplist, star, itemTitle, price, image, isSearch, className, key, ...props }) => {
  const router = useRouter();
  const [count, setCount] = useState(1)
  const countUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev + 1)
  }
  const countDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev - 1)
  }
  const bubling = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev - 1)
  }

  return (
    <>
      <div key={key} className={styles.ItemDescription}>
        <HStack spacing="sm" position="between">
          <div className={styles.itemCardLeft}>
            <Image
              src={image}
              alt={itemTitle}
              width={160}
              height={160}
              className={styles.image}
              style={{ display: 'block' }}
            />
          </div>
          <div className={styles.ItemDescriptionR}>
            <h2 className={`${styles.itemTitle} ${styles.mB8}`}>{itemTitle}</h2>
            {/* {!isCartCard && <p className={`${styles.review_star}`}><span>{star}</span></p>} */}
            <p className={`${styles.price} ${styles.mB8}`}>¥{price}</p>
          </div>
        </HStack>
      </div>
    </>
  );
};
