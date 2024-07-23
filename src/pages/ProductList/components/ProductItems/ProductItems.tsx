import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateURLNameAndId } from 'src/utils/FuncFormat'
import { rateSale } from 'src/utils/rateSale'
interface Props {
  product: ProductType
}
export default function ProductItems({ product }: Props) {
  return (
    <Link to={`${path.home}${generateURLNameAndId({ name: product.name, id: product._id })}`}>
      <div className='flex h-full flex-col justify-between rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.4rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
          {product.price !== 0 ? (
            <span className='absolute right-0 top-0  bg-orange px-2 py-2 text-[13px] text-white md:text-sm lg:p-2 lg:text-sm'>
              {' '}
              {rateSale(product.price_before_discount, product.price)}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className='flex flex-col overflow-hidden p-2'>
          <div className='flex-2 line-clamp-2 min-h-[2rem] justify-start text-base'>{product.name}</div>
          <div className='flex-2 mt-3 items-center justify-start text-[8px] md:text-base lg:text-base'>
            <div className='ml-1 font-semibold text-red-500'>
              <span className='text-lg'>₫</span>
              <span className='text-lg'>
                {product.price === 0 ? formatCurrency(product.price_before_discount) : formatCurrency(product.price)}
              </span>
            </div>
            {product.price === 0 ? (
              <></>
            ) : (
              <div className=' text-gray-500 '>
                <span className='text-xs '>₫</span>
                <span className='text-xs line-through'>{formatCurrency(product.price_before_discount)}</span>
              </div>
            )}
          </div>
          <div className='flex-2 mt-3 items-end justify-end'>
            <div className='flex'>
              <ProductRating rating={product.rating || 0} />
              <div className='ml-2 text-base '>
                <span>{formatNumberToSocialStyle(product.sold || 0)}</span>
                <span className='ml-1'>Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
