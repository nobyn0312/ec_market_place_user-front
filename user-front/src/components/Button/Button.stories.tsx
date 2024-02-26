import { FC, ReactNode } from 'react'
import styles from './button.module.css'
import classNames from 'classnames'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Buttons（ボタン）/Button',
  component: Button,

}
export default meta


export const Button: FC<Props> = ({ shape, className, children, ...props }) => {
  return (
    <button
      className={classNames(styles[shape])}
      {...props}
    >
      {children}
    </button>
  )
}
