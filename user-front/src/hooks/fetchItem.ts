// import { useState, useEffect } from 'react';
// import { ItemApi } from '../../types/axios';

// const useFetchItems = (itemId) => {
//   // アイテムの初期状態 配列
//   const [items, setItems] = useState([]);

//   const itemApi = new ItemApi();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await itemApi.getItems(itemId);
//         setItems(response.data);
//       } catch (error) {
//         console.error('商品一覧を取得できませんでした:', error);
//       }
//     };
//     fetchItems();
//   }, []);
//   return items;
// };

// export default useFetchItems;