import React from 'react';
import styles from './TableBox.module.css'
interface Props {
  tabledata: { column1: string; column2: string; column3: string; column4:string }[];
}

export const TableBox: React.FC<Props> = ({ tabledata }) => {
  return (
    <div>
      <table className={styles.detailsTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th>&nsbp;</th>
            <th>商品</th>
            <th>価格</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {tabledata.map((item, index) => (
            <tr key={index}>
              <td><img src={item.column1} alt={`商品画像${index}`} /></td>
              <td>{item.column2}</td>
              <td>{item.column3}</td>
              <td>{item.column4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBox;
