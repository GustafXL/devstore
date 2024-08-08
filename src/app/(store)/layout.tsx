import Header from '@/components/header'
import { CartProvider } from '@/contexts/cartContext'
import { ReactNode } from 'react'

interface Children {
  children: ReactNode
}

export default function StoreLayout({ children }: Children) {
  return (
    <CartProvider>
      <div className="min-h-screen mx-auto grid w-full max-w-[1600px] grid-rows-app gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
