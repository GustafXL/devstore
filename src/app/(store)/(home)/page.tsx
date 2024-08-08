import api from '@/app/data/api'
import { Products } from '@/app/data/types/products'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Products[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })
  const products = await response.json()

  return products
}

export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[920px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/products/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highLightedProduct.image}
          width={920}
          height={920}
          alt=""
          quality={100}
          className="group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((products) => (
        <Link
          key={products.id}
          href={`/products/${products.slug}`}
          className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src={products.image}
            width={920}
            height={920}
            alt=""
            quality={100}
            className="group-hover:scale-105 transition-all duration-500"
          />

          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{products.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {products.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
