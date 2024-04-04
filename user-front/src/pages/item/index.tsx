import React from 'react'
import styles from '/item.module.css'
import { Container } from '@/components/Container/Container'
import item1 from '/public/item-list.png';
import item2 from '/public/item2_1.png'
import { Typography } from '@/components/Typography/Typography';
import { ItemDescription } from '@/components/ItemDescription/ItemDescription';

const index = () => {
  return (
    <div>
      <main>
        <Container>
          <Typography size='md'>検索結果：ガジェット</Typography>
          <ItemDescription itemTitle='タブレット' price='17,980' imageUrl={item1} />
        </Container>
      </main>
    </div>
  )
}

export default index