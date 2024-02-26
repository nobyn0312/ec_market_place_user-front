import { Container } from "@/components/Container/Container";
import React, { useState } from "react";
import styles from "@/pages/account/sign_in/index.module.css";
import { Button } from "@/components/Button/Button";
import visa from "../image/VISA-logo.png";
import mastercard from "../image/Mastercard-Logo.png";
import jcb from "../image/JCB-logo.png";

const index = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const monthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    return { value: monthString, label: monthString };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => {
    const year = currentYear + index;
    return { value: year.toString(), label: year.toString() };
  });

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  return (
    <>
      <Container>
        <div className={styles.container} style={{ marginBottom: "10rem" }}>
          <p className={styles.maintitle}>クレジット情報登録</p>
          <div className={styles.cardlogos}>
            <img src={visa.src} alt="Visa Logo" />
            <img src={mastercard.src} alt="Mastercard Logo" />
            <img src={jcb.src} alt="JCB Logo" />
          </div>
          <p className={styles.title}>カード番号</p>
          <input id="code" name="code" className={styles.textfeild} style={{ width: "100%" }} type="email" placeholder="カード番号(ハイフンなし)" />

          <div>
            <p className={styles.title}>有効期限</p>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex" }}>

                <div className={styles.carddate}>
                  <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="" disabled>12</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>
                <span className={styles.tanjoubi} style={{ marginTop: "7px" }}>月</span>

                <div className={styles.carddate} style={{ marginLeft: "5px" }}>
                  <select value={selectedYear} onChange={handleYearChange}>
                    <option value="" disabled>2030</option>
                    {years.map((year) => (
                      <option key={year.value} value={year.value}>{year.label}</option>
                    ))}
                  </select>
                </div>
                <span className={styles.tanjoubi} style={{ marginTop: "7px" }}>年</span>

              </div>
            </div>

          </div>
          <p className={styles.title}>セキュリティコード</p>
          <input id="scode" name="scode" className={styles.textfeild} style={{ width: "20%" }} type="scode" maxLength={3} />
          <button type="submit" className={styles.button} style={{ marginTop: "2rem" }}>確認する</button>
        </div>
      </Container >
    </>
  )
}
export default index;