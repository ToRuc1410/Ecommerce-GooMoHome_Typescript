import path from 'src/constants/path'
import { Product, ProductConfig, ProductList } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts(params: ProductConfig) {
    return http.get<SuccessResponse<ProductList>>(path.products, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${path.products}/${id}`)
  },
  postProductView(body: { id: string }) {
    return http.put<SuccessResponse<string>>(`${path.products}`, body)
  }
}
export default productApi
