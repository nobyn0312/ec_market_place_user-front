import { FC , ReactNode } from 'react'
import styles from './Container.module.css'
import classNames from 'classnames'


interface  Props{
  children: ReactNode
  className?: string
  style?:any
}

export const Container:FC<Props>=({className,children,style,...props})=>{
  return(
    <div
     className={classNames(styles.default, className)}
    {...props}>
    {children}
    </div>
  )
}

