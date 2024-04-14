import React, { FC } from 'react'
import { HStack } from '../HStack/Hstack'
import styles from './Shopname.module.css'
import Link from 'next/link'

interface Props {
  shopname: string
  shopthumbnail: any | string
  shoppagelink : string

}

export const Shopname: FC<Props> = ({ shopname, shopthumbnail, shoppagelink,...props}) => {
  return (
    <>
      <div className={styles.shopName}>
        <Link href={shoppagelink}>
          <HStack spacing='md' className={styles.shopNameInner}>
            <img src={shopthumbnail}
              width={48}
              height={48}
              alt=""
              className={styles.shopImg}
            />
            <p>{ shopname}</p>
          </HStack>
        </Link>
      </div>
    </>
  )
}