import React, { useState } from 'react'
import Image from "next/image";
import styles from './Header.module.css'
import cartIcon from 'public/cart.svg'
import logo from 'public/ec-app.svg'
import searchIcon from 'public/searchIcon.svg'
import { Icon } from '../Icon/Icon';
import navIcon from 'public/icons/navIcon.svg'
import ToggleBlk from 'public/icons/toggleBlk.svg';
import { Container } from '../Container/Container';
import { Typography } from '../Typography/Typography';
import Link from 'next/link';
import { useAtom } from "jotai";
import { incrementCountAction } from "@/pages/_app";


const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    console.log("ハンバーガー");
    setOpenMenu(!openMenu);
  }

  // カートの数値変更
  const [cartQuantity, setCartQuantity] = useState(0)


  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.flexWrap} ${styles.container}`}>
          <div className={styles.Nav}>
            <button className={`${styles.navbtn}`} onClick={handleMenuOpen} type="button" >
              <Icon src={navIcon.src} size='md' />
            </button>
          </div>
          <h1>
            <a href="/">
              <img src={logo.src} alt="" />
            </a>
          </h1>
          <div className={styles.cartIcon}>
            <a href="/cart">
              <img src={cartIcon.src} alt="cart" />
              <p className={styles.cartNum}>{cartQuantity}</p>
            </a>
          </div>
        </div>

        <nav className={openMenu ? `${styles.navMenu} ${styles.showMenu}` : styles.navMenu}>
          <h1 className={`${styles.navLogo}`}>
            <a href="/">
              <img src={logo.src} alt="" />
            </a>
          </h1>
          <ul>
            <li><a href="">ホーム</a></li>
            <li><a href="">アカウント情報</a></li>
            <li><a href="/order/history">注文履歴</a></li>
            <li><a href="/shop/list">お気に入りショップ</a></li>
            <li><a href="">ログアウト</a></li>
          </ul>
          <button className={`${styles.Menunavbtn}`} onClick={handleMenuOpen} type="button" >
            <Icon src={ToggleBlk.src} size='md' />
          </button>
        </nav>

        <form id="searchBox" className={styles.searchForm}>
          <input type="text" placeholder='検索' />
          <input id="sbtn" className={styles.sbtn} type="submit" value="" />
          <img src={searchIcon.src} className={styles.searchIcon} alt="" />
        </form>
        <div className={styles.customerName}>
          <p>○○さん </p>
        </div>
      </header>
    </>
  )
}


export default Header