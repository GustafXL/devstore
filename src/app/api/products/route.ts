import { NextResponse } from 'next/server'
import data from './data.json'

export default function GET(request: Request) {
  return NextResponse.json(data.products)
}
