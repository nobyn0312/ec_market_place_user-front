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
import { useAtom } from "jotai/index";
import { cartAtom } from "@/pages/_app";



const Header = () => {

  const [cart, setCart] = useAtom(cartAtom);


  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  }

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
            <Link href="/">
              <img src={logo.src} alt="" />
            </Link>
          </h1>
          <div className={styles.cartIcon}>
            <Link href={"/cart"}>
              <img src={cartIcon.src} alt="cart" />
              <p className={styles.cartNum}>{cart.length}</p>
            </Link>
          </div>
        </div>

        <nav className={openMenu ? `${styles.navMenu} ${styles.showMenu}` : styles.navMenu}>
          <h1 className={`${styles.navLogo}`}>
            <Link href="/">
              <img src={logo.src} alt="" />
            </Link>
          </h1>
          <ul>
            <li><Link href="">ホーム</Link></li>
            <li><Link href="">アカウント情報</Link></li>
            <li><Link href="/order/history">注文履歴</Link></li>
            <li><Link href="/shop/list">お気に入りショップ</Link></li>
            <li><Link href="">ログアウト</Link></li>
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