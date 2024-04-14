import { Container } from '@/components/Container/Container'
import React from 'react'
import styles from '../index.module.css'
import item1 from '/public/controller.png'
import item2 from '/public/controller.png'
import { HistoryItem } from '@/components/Historyitem/HistoryItem'

const history = () => {
  return (
    <div>
      <Container className={styles.history}>
        <h2 className={styles.pageTtl}>注文履歴</h2>
        <p className={styles.recent}>過去3ヶ月</p>
        <div>
          <ul className={styles.historyList}>
            <HistoryItem imageUrl={item1} title='テストアイテム' date='9月3日' />
            <HistoryItem imageUrl={item2} title='テストアイテム' date='9月3日' />
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default history