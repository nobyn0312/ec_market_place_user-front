import React, { useContext ,useEffect } from 'react'
import {CartContext}  from '@/context/CartContext'


type initialState = {
  cartState: string[];
  setCartState: React.Dispatch<React.SetStateAction<never[]>>;
};
const RemoveCart = () => {
  const { cartState, setCartState } = useContext(CartContext);

  const removeItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const itemId = ""/* ここにIDを取得するコードを追加 */;
    const updatedCart = cartState.filter((item) => item.id !== itemId);

    // セットされた新しい配列をコンテキストに反映
    setCartState(updatedCart);

    // console.log('削除')
    console.log(cartState)
    // 空の配列をセットして、カートを空にする
    cartState.length = 0;
    // console.log(cartState)

  };
  useEffect(() => {
    console.log(cartState); // 更新後の cartState を表示
  }, [cartState]);

  // return (
  //   <>
  //     <button onClick={removeItems}>削除</button>
  //   </>
  // );
};

export default RemoveCart