import { Link } from 'react-router-dom'
import PopHover from '../PopHover'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'

import { purchasesStatus } from 'src/constants/purchaseStatus'
import purchasesAPI from 'src/apis/purchase.api'
import noproduct from 'src/assets/img_cart/noCart.png'
import { formatCurrency } from 'src/utils/FuncFormat'
import NavHeader from '../NavHeader'
import useSearchProducts from 'src/hooks/useSearchProducts'

const MAX_PURCHASES = 5

export default function Header() {
  const { isAuthenticated } = useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProducts()
  // gọi API lấy giỏ hàng trong Cart và phải là user đã Login || Register
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesAPI.getPurchase({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-orange pb-5 pt-2 text-white'>
      <div className='container'>
        <NavHeader />
      </div>
      <div className='container'>
        <div className='grid grid-cols-12 items-end gap-5'>
          <Link to={path.home} className='col-span-2 '>
            <img
              className='h-full w-full rounded-md bg-white object-cover py-4 shadow-lg lg:py-0'
              src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=819.000032544136,fit=crop/YbNbPPqn2EfwxjP7/chat-hon-to-cu-1-png-m7V2704oB7HDV1b2.png'
              alt='Goomo Home logo'
              data-v-fb585256
              data-qa='builder-siteheader-img-logo'
            />
          </Link>
          <form className='col-span-8 shadow-lg' onSubmit={onSubmitSearch}>
            <div className='relative flex rounded-sm bg-white p-1'>
              <input
                type='text'
                placeholder='Free Ship nội thành phố Hồ Chí Minh'
                className=' flex-grow border-none bg-transparent px-3 py-2 text-gray-600 outline-none'
                {...register('searchProduct')}
              />
              <button className='absolute right-0 top-0 rounded-sm bg-gray-300 px-7 py-2 text-orange hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-7 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='cols-span-1 justify-self-center'>
            <PopHover
              renderPopHover={
                <div className='relative max-w-[400px] rounded-md border border-gray-200 bg-white text-sm shadow-lg'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-slate-200' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} sản
                          phẩm giỏ hàng
                        </div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:opacity-80'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center'>
                      <img src={noproduct} alt='No Products' className='h-30 w-30' />
                      <div className='mt-3 capitalize'> Chưa có sản phẩm trong giỏ hàng</div>
                      {!isAuthenticated && (
                        <div className=' mt-5 flex items-center justify-center'>
                          <Link to={path.register} className='rounded-sm bg-slate-200 px-3 py-2 hover:bg-slate-400'>
                            Đăng kí
                          </Link>
                          <Link to={path.login} className='ml-4 rounded-sm bg-slate-200 px-3 py-2 hover:bg-slate-400'>
                            Đăng nhập
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.home} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-12 w-12 p-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute left-[25px] top-[-2px] rounded-full bg-white px-[10px] py-[2px] text-xs text-orange'>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </PopHover>
          </div>
        </div>
      </div>
    </div>
  )
}
