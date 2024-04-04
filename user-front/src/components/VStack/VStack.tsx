import { FC, HTMLAttributes, ReactNode } from 'react'
import styles from './VStack.module.css'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * どこに寄せるか
   */
  position?: 'center' | 'right' | 'left' | 'between'
  /**
   * スペース
   */
  spacing?: 'no-space' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * 中身
   */
  children: ReactNode
}

export const VStack: FC<Props> = ({ children, position, spacing, className, ...props }) => {
  return (
    <div
      className={classNames(styles.default, position && styles[position], spacing && styles[spacing], className)}
      {...props}
    >
      {children}
    </div>
  )
}
