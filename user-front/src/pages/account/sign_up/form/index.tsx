import { Container } from "@/components/Container/Container";
import React, { useState } from "react";
import styles from "@/pages/account/sign_in/index.module.css";
import { Button } from "@/components/Button/Button";

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <p className={styles.maintitle}>アカウント作成</p>
          <div className={styles.container}>
            <div>
              <p className={styles.title}>氏名</p>
              <div>
                <input className={styles.textfeild} style={{ width: "174px" }} placeholder="名前" />
                <input className={styles.textfeild} style={{ marginLeft: "10px", width: "174px" }} placeholder="名字" />
              </div>
              <div>
                <p className={styles.title}>メール</p>
                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.textfeild} type="email" />
              </div>
              <p className={styles.title}>生年月日</p>
              <div style={{ marginTop: "5px" }}>
                <input className={styles.textfeild_date} placeholder="1995" maxLength={4} />
                <span className={styles.tanjoubi}>年</span>
                <input className={styles.textfeild_date} placeholder="12" maxLength={2} />
                <span className={styles.tanjoubi}>月</span>
                <input className={styles.textfeild_date} placeholder="31" maxLength={2} />
                <span className={styles.tanjoubi}>日</span>
              </div>
              <div>
                <p className={styles.title}>電話ばんご</p>
                <input className={styles.textfeild} value="🇯🇵 +81" readOnly style={{ marginTop: "2px", width: "60px" }} />
                <input className={styles.textfeild} style={{ marginLeft: "10px" }} />
              </div>

              <div>
                <p className={styles.title}>お届け先住所</p>
                <input className={styles.textfeild} style={{ marginTop: "2px", width: "80px" }} placeholder="000" maxLength={3} />
                <span style={{ marginLeft: "10px", fontSize: "22px", fontWeight: "lighter" }}>-</span>
                <input className={styles.textfeild} style={{ marginLeft: "10px", width: "80px" }} placeholder="0000" maxLength={4} />
              </div>
              <div style={{ marginTop: "10px" }}>
                <input className={styles.textfeild} style={{ marginTop: "2px", width: "80px" }} placeholder="東京都" />
                <input className={styles.textfeild} style={{ marginLeft: "10px" }} placeholder="住所" />
              </div>

              <div>
                <p className={styles.title}>パスワード</p>
                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.textfeild} type="password" />
              </div>
              <div>
                <p className={styles.title}>パスワード(確認)</p>
                <input className={styles.textfeild} type="password" />
              </div>

            </div>
            <div style={{ marginTop: "2rem" }}>
              <button type="submit" className={styles.button}>Sign Up</button>
              <a href="/account/sign_in" className={styles.second}>すでにアカウントをお持ちですか？ ログイン</a>
            </div>
          </div>
        </form>
      </Container >
    </>
  )
}
export default index;


//cmd click


