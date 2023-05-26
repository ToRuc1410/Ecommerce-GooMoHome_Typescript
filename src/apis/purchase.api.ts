import { Purchase, PurchaseStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'
const AddProduct = 'add-to-cart'
const UpdatePurchase = 'update-purchase'
const Buy_Products = 'buy-products'
const purchasesAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${URL}/${AddProduct}`, body)
  },
  getPurchase: (params: { status: PurchaseStatus }) => {
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
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/${Buy_Products}`, body)
  }
}

export default purchasesAPI
