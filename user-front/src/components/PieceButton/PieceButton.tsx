import { FC, useState } from 'react'
import { HStack } from '../HStack/Hstack'
import styles from './PieceButton.module.css'
// import CartContext from '@/context/CartContext';

interface Props {
  className?: string;
}

interface PieceButtonProps {
  className?: string;
  onClick: () => void;
}

export const PieceButton: FC<Props> = ({ className }) => {
  const [count, setCount] = useState(1)
  const countUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev + 1)
  }

  const countDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev - 1)
  }



  return (
    <div className={className}>
        <HStack className={`${styles.shadow} ${styles.PieceButton}`}>
          <button onClick={countDown} className={`${styles.changeButton} ${styles.changeButton_R}`}>-</button>
          <p className={styles.piece}>{count}</p>
          <button onClick={countUp} className={`${styles.changeButton} ${styles.changeButton_R}`}>+</button>
        </HStack>
    </div>
  )
}