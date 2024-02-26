import { FC } from "react";
import styles from "./HistoryItem.module.css"
import Image from "next/image";
import { HStack } from "../HStack/Hstack";

interface Props {
  className?: string
  imageUrl: any | string
  date: string
  title:string
}

export const HistoryItem: FC<Props> = ({ imageUrl, className, title, date, ...props }) => {
  return (
    <>
      <li className={styles.historyItem}>
        <a href="/order/details">
          <HStack spacing='xlg' position='between' style={{ alignItems: 'center' }}>
            <img
              src={imageUrl.src}
              alt="#"
              width={78} height={78} />
            <div className={styles.historyDescription}>
              <p className={styles.itemTitle}>{title}</p>
              <p className={styles.date}>{date}に 配達済</p>
            </div>
          </HStack>
        </a>
      </li>
    </>
  )
};