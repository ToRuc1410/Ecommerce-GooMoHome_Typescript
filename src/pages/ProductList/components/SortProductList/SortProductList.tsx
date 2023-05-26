import { sortBy, order as orderContant } from 'src/types/product'
import { ProductConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
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
      <div className='flex flex-wrap items-center justify-around gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-sm text-gray-500'>Sắp xếp theo</div>
          <button
            className={classNames('h-8 rounded-sm  px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 rounded-sm  px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            mới nhất
          </button>
          <button
            className={classNames('h-8 rounded-sm  px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            bán chạy
          </button>
          <select
            className={classNames('h-8 rounded-sm px-4 text-left text-sm capitalize outline-none ', {
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
        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {/* điều kiện cho page(pagination) */}
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
