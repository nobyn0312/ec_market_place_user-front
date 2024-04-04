import React, { FC } from 'react'
import styles from './OrderHistoryCard.module.css'
// import { Props } from 'next/script'

import item1 from '/public/item2_1.png';
import item2 from '/public/item2_2.png'
import item3 from '/public/item2_3.png'

interface Props {
  variant?: 'item' | 'details'
  className?: string

}


export const OrderHistoryCard: FC<Props> = ({ variant, className, ...props }) => {
  return (
    <table className={styles.detailsTable}>
      <tbody>
        <tr className={styles.tableHead}>
          <th>&nbsp;</th>
          <th>商品</th>
          <th>価格</th>
          <th>数量</th>
        </tr>
        <tr>
          <td><img src={item1.src}
            width="72px"
            height="72px"
            alt="#"
          /></td>
          <td>コントローラー</td>
          <td>¥2,980</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  )
}

export default OrderHistoryCard