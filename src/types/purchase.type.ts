// Method: GET Query Params: status: Trạng thái đơn hàng
import { detailPurchase } from './detailPurchase.type'
import { Product } from './product.type'

// Thông tin status:

// -1: Sản phẩm đang trong giỏ hàng
// 0: Tất cả sản phâm
// 1: Sản phẩm đang đợi xác nhận từ chủ shop
// 2: Sản phẩm đang được lấy hàng
// 3: Sản phẩm đang vận chuyển
// 4: San phẩm đã được giao
// 5: Sản phẩm đã bị hủy
export type PurchaseStatus = -1 | 1

export type PurchaseListStatus = PurchaseStatus

export type OrderDetailListStatus = 0 | 1 | 2 | 3 | 4 | 5

export interface Purchase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailPurchase: detailPurchase[]
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: OrderDetailListStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
  total_price: number
  priceDelivery: number
  delivered_at: string
  paiAt: string
  WhoCanceled: string
  reasonForMessage: string
}
export type checkedPurchases = {
  product: Product
  buy_count: number
}
export interface extendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}
