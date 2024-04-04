import React, { FC, HTMLAttributes, ReactNode } from 'react'
import styles from './Typography.module.css'
import classNames from 'classnames'


type TypographyTag = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'th' | 'td' | 'p'
type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'pure' | 'black'
type TypographySize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'


export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** HTMLタグ */
  tag?: TypographyTag
  /** テキストの色 */
  color?: TypographyColor
  /** テキストのサイズ */
  size?: TypographySize
  /** テキストのフォント */
  font?: 'normal' | 'bold'
  /** テキストの位置 */
  textAlign?: 'right' | 'center' | 'left'
  lineHeight?: boolean
  children: ReactNode
}

export const Typography: FC<TypographyProps> = ({
  tag: Tag = 'p',
  color = 'primary',
  size = 'xs',
  font = 'normal',
  lineHeight,
  textAlign,
  children,
  className,
  ...props
}) => {
  return (
    <Tag
      className={classNames(
        styles.default,
        styles[color],
        styles[size],
        styles[font],
        lineHeight && styles['lineHeight'],
        textAlign && styles[textAlign],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
