import React, { useState } from 'react'
import { Container } from '@/components/Container/Container'
import styles from '../shop.module.css'
import { HStack } from '@/components/HStack/Hstack'
import { Shopname } from '@/components/Shopname/Shopname'
import shopthumb1 from '/public/sampleshop.png'
import shopthumb2 from '/public/shopthumb2.png'


interface Radio {
  label: string
  value: string
}


const index = () => {
  const [selectedTab, setSelectedTab] = useState('favorite');

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  return (
    <>
      <Container>
        <div className={styles.tabs}>
          <div className={styles.tabs_inner}>
            <input
              id="favorite"
              type="radio"
              name="tab_item"
              value="favorite"
              checked={selectedTab === 'favorite'}
              onChange={handleTabChange}
            />
            <label className={styles.tab_item} htmlFor="favorite">
              お気に入り
            </label>
            <input
              id="all"
              type="radio"
              name="tab_item"
              value="all"
              checked={selectedTab === 'all'}
              onChange={handleTabChange}
            />
            <label className={styles.tab_item} htmlFor="all">
              ショップ一覧
            </label>
          </div>


          <div className={styles.tab_content} id="all_content">
            {selectedTab === 'all' && (
              <ul className={styles.tab_content_description}>
                <li className={styles.c_txtsp}>
                  <Shopname shopname={'cio'} shopthumbnail={shopthumb2.src} shoppagelink={'../shop/details'} />
                </li>
              </ul>
            )}
          </div>

          <div className={styles.tab_content} id="favorite_content">
            {selectedTab === 'favorite' && (
              <ul className={styles.tab_content_description}>
                <li className={styles.c_txtsp}>
                  <Shopname shopname={'favshop'} shopthumbnail={shopthumb1.src} shoppagelink={'../shop/details'} />
                </li>
              </ul>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default index;
