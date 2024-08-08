/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server'
import data from '../data.json'

export async function GET(request: Request) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const featuredProduct = data.products.filter(product => product.featured)

    return NextResponse.json(featuredProduct)
}