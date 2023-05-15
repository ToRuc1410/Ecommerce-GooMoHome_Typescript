import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import ProductItems from './ProductItems'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { omitBy, isUndefined } from 'lodash'
import { ProductConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  // format all key = string bởi vì url chỉ nhận string
  [key in keyof ProductConfig]: string
}

export default function ProductList() {
  // ====================== gửi data lên api
  // queryKey nhận vào tham số thứ 2 là: queryParams
  //nếu có sự thay đổi thì nó sẽ re-render hàm useQuery và cho lại data mới
  const queryParams: QueryConfig = useQueryParams()
  // loại bỏ những thuộc tính khi chạy cho ra undefined
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
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
  // get All Products
  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductConfig)
    },
    // thuộc tính này giúp cho việc thay đổi chuyển trang k bị cập nhật lại rồi set lại data
    // mà nó sẽ giữ gtri cũ và cập nhật mới => tránh re-render
    keepPreviousData: true
  })

  // Get All Categories
  const { data: Categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductsData && Categories && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={Categories.data.data} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {ProductsData.data.data.products.map((items) => (
                  <div className='col-span-1' key={items._id}>
                    <ProductItems product={items} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
