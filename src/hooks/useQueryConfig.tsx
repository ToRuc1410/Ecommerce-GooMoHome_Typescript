/// ====================== Custom Hooks =================
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { ProductConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  // format all key = string bởi vì url chỉ nhận string
  [key in keyof ProductConfig]: string
}

export default function useQueryConfig() {
  // ====================== gửi data lên api
  // queryKey nhận vào tham số thứ 2 là: queryParams
  //nếu có sự thay đổi thì nó sẽ re-render hàm useQuery và cho lại data mới
  const queryParams: QueryConfig = useQueryParams()
  // loại bỏ những thuộc tính khi chạy cho ra undefined
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page,
      limit: queryParams.limit,
      name: queryParams.name,
      exclude: queryParams.exclude,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
