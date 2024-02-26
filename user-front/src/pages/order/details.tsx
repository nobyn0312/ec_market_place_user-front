import { Container } from '@/components/Container/Container'
import React from 'react'

// import tabledata from '@/data/Tabledata'
import Tabledata from '@/data/tabledata'

import styles from './index.module.css'
import OrderHistoryCard from '@/components/OrderHistoryCard/OrderHistoryCard'
import { Table } from '@/components/Table/Table'
import TableBox from '@/components/TableBox/TableBox'

const details = () => {
  const tableData = Tabledata(); // 関数を呼び出してデータを取得

  return (
    <>
      <Container className={styles.detailsWrap}>
        <div>注文の詳細</div>
        <div>
          <TableBox tabledata={tableData} />
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
        </div>
      </Container>
    </>
  )
}

export default details