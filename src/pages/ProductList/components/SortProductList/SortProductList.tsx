import { sortBy, order as orderContant } from 'src/types/product'
import { ProductConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  // get kiểu sort [Phổ biến(view), mới nhất(createdAt[Actived]), bán chạy(sold) ]
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  //active khi click vào kiểu sort nào
  const isActiveSortBy = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  // handle cho kiểu Sort ['phổ biến', 'mới nhất','bán chạy']
  const handleSort = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePrice = (sortPrice: Exclude<ProductConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: sortPrice
      }).toString()
    })
  }

  return (
    <div className='rounded-md bg-gray-300 p-3'>
      <div className=' items-center justify-end gap-2 font-poppins text-[9px] capitalize md:text-[12px] lg:justify-around lg:text-sm'>
        <div className='flex flex-row items-center gap-2 md:gap-4 lg:gap-5'>
          <div className=' hidden text-gray-500 md:block'>Sắp xếp theo</div>
          <button
            className={classNames('h-8 flex-1 rounded-sm  px-6 text-center  capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 flex-1 rounded-sm  px-6 text-center  capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            mới nhất
          </button>
          <button
            className={classNames('h-8 flex-1 rounded-sm  px-6 text-center  capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            bán chạy
          </button>
          <select
            className={classNames('h-8 flex-1 rounded-sm text-center capitalize outline-none', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePrice(event.target.value as Exclude<ProductConfig['order'], undefined>)}
          >
            <option className='bg-white text-black' value='' disabled>
              Giá
            </option>
            <option className='bg-white text-black' value={orderContant.asc}>
              Giá: Thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderContant.desc}>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}
