import { OrderDetailListStatus, Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'
const AddProduct = 'add-to-cart'
const UpdatePurchase = 'update-purchase'
const Buy_Products = 'buy-products'
const Order_Detail = 'order-detail'
const DeliveredOrder = 'delivered-order'
const deleteOrder = 'delete-order'
const orderReview = 'order-review'
const purchasesAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${URL}/${AddProduct}`, body)
  },
  getPurchase: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponse<Purchase>>(`${URL}/${UpdatePurchase}`, body)
  },
  deletePurchase: (purchaseIds: string[]) => {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  },
  orderDetailPurchase: (params: { status: OrderDetailListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(`${Order_Detail}`, {
      params
    })
  },
  deliveredOrderPurchase: (body: { orderDetail_id: string }) => {
    return http.put<SuccessResponse<string>>(`${DeliveredOrder}`, body)
  },
  deleteOrderPurchase: (body: { orderDetail_id: string; message: string }) => {
    return http.put<SuccessResponse<string>>(`${deleteOrder}`, body)
  },
  orderReview: (body: {
    orderDetail_id: string
    material: string
    description: string
    message: string
    rating: number
  }) => {
    return http.put<SuccessResponse<string>>(`${orderReview}`, body)
  },
  // buyProducts: (body: { product_id: string; buy_count: number }[]) => {
  //   return http.post<SuccessResponse<Purchase[]>>(`${URL}/${Buy_Products}`, body)
  // }
  buyProducts: (body: {
    address: string
    codeProvince: string
    codeDictrict: string
    codeWard: string
    priceDelivery: number
    totalPrice: number
    name: string
    phone: string
    message: string
    products: { product_id: string; buy_count: number }[]
  }) => {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/${Buy_Products}`, body)
  }
}

export default purchasesAPI
