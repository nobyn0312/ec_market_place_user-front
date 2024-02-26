import React, { useContext, useEffect } from 'react';
// import { CartContext } from '@/context/CartContext';
import { Button } from '../Button/Button';
import { Item } from '../../../types/axios';

interface Props {
  item: string
}

const AddCart = ({ Item }) => {
  // const { addCart, cartState } = useContext(CartContext);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addCart(Item);
  };

  // useEffect(() => {
  //   console.log(cartState);
  // }, [cartState]);

  return (
    <>
      <Button onClick={handleAddToCart} shape='rounded'>カートに追加</Button>
    </>
  );
};

export default AddCart;
