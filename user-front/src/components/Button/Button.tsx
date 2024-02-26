import { FC, ReactNode } from 'react'
import styles from './button.module.css'
import classNames from 'classnames'

interface Props {
  shape: 'rounded' | 'square' | 'text',
  children: ReactNode,
  className?: string
  onClick?: (event: any) => void
  style?: string
}

export const Button: FC<Props> = ({ shape, className, children, style, onClick, ...props }) => {
  return (
    <button onClick={onClick}
      className={classNames(styles[shape])}
      {...props}
    >
      {children}
    </button>
  )
}
