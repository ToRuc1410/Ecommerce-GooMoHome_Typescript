import AsideFilter from './components/AsideFilter'
import ProductItems from './components/ProductItems'
import SortProductList from './components/SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import SlideShow from 'src/components/SlideShow/SlideShow'
import { Spinner } from '@material-tailwind/react'
import SlideShowCategory from 'src/components/SlideShowCategory'

export default function ProductList() {
  // ====================== gửi data lên api
  // loại bỏ những thuộc tính khi chạy cho ra undefined
  const queryConfig = useQueryConfig()
  // get All Products
  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductConfig)
    },
    // thuộc tính này giúp cho việc thay đổi chuyển trang k bị cập nhật lại rồi set lại data
    // mà nó sẽ giữ gtri cũ và cập nhật mới => tránh re-render
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  // Get All Categories
  const { data: Categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className='bg-gray-200 pb-5'>
      <div className='h-52 py-2 md:h-64 lg:h-[550px]'>
        <SlideShow autoplayDelay={2500} />
      </div>
      {Categories && (
        <div className='block h-16 py-2 md:hidden lg:hidden'>
          <SlideShowCategory categories={Categories.data.data} queryConfig={queryConfig} />
        </div>
      )}
      <div className='container pt-2'>
        {ProductsData && Categories ? (
          <div className='grid grid-cols-12 gap-6'>
            <div className='hidden md:col-span-3 md:block lg:col-span-3 lg:block'>
              <AsideFilter categories={Categories.data.data} queryConfig={queryConfig} />
            </div>
            <div className='col-span-12 md:col-span-9 lg:col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5'>
                {ProductsData.data.data.products.length > 0 ? (
                  ProductsData.data.data.products.map((items) => (
                    <div className='col-span-1 ' key={items._id}>
                      <ProductItems product={items} />
                    </div>
                  ))
                ) : (
                  <div className='flex w-full items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-20 w-20'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z'
                      />
                    </svg>
                    <span>Xin lỗi hiện tại sản phẩm hiện tại ĐÃ HẾT </span>
                  </div>
                )}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
            </div>
          </div>
        ) : (
          <>
            <Spinner className='flex h-12 w-12 items-center justify-center text-gray-900/50' />
          </>
        )}
      </div>
    </div>
  )
}
