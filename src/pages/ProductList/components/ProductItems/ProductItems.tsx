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
      <div className='rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.4rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
          {product.price !== 0 ? (
            <span className='absolute right-0 top-0  bg-orange px-1 text-[13px] text-white md:text-sm lg:p-2 lg:text-sm'>
              {' '}
              {rateSale(product.price_before_discount, product.price)}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
          <div className='mt-3 flex flex-wrap items-center justify-end text-[8px] md:text-xs lg:text-xs'>
            {product.price === 0 ? (
              <></>
            ) : (
              <div className=' text-gray-500 line-through'>
                <span className='text-xs'>₫</span>
                <span className='text-xs'>{formatCurrency(product.price_before_discount)}</span>
              </div>
            )}
            <div className='ml-1 text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-xs'>
                {product.price === 0 ? formatCurrency(product.price_before_discount) : formatCurrency(product.price)}
              </span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating || 0} />
            <div className='ml-2 text-xs'>
              <span>{formatNumberToSocialStyle(product.sold || 0)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
