import { Product } from './product.type'

export interface detailPurchase {
  buy_count: number
  createdAt?: string

  price: number
  price_before_discount: number
  product: Product
  status: number
  total_price: number
  updatedAt?: string
  _id: string
}
