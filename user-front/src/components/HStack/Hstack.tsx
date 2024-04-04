import { FC, HTMLAttributes, ReactNode } from 'react'
import styles from '../HStack/HStack.module.css'
import classnames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg'
  children: ReactNode,
  position?: 'center' | 'right' | 'left' | 'between'
}


export const HStack: FC<Props> = ({ children, position, spacing, className, ...props }) => {
  return (
    <div
      className={classnames(
        styles.default,
        className,
        spacing && styles[spacing],
        position && styles[position],
      )}
      {...props}
    >
      {children}
    </div>
  )
}