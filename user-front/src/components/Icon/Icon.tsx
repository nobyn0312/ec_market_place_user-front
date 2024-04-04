import { FC, HTMLAttributes } from 'react'
import React from 'react'
import styles from './Icon.module.css'
import classNames from 'classnames'


interface Props extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  size?: 'xxs' | 'xs' | 'ss' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  handleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  className?: string
}

export const Icon: FC<Props> = ({ src, alt, size = 'sm', handleClick, className, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={classNames(styles[size], className)}
      onClick={handleClick && ((e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClick(e))}
    />
  )
}
