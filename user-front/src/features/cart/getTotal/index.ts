import { cartAtom } from '@/pages/_app'
// import { useAtom } from 'jotai'



// const [cart, setCart] = useAtom(cartAtom)
export const getTotal = (cart:string) => {
  // 小計を求める
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i].item
    const count = cart[i].count
    total += item.price * count
  }

  return total
  console.log(total) // 小計を出力
}
