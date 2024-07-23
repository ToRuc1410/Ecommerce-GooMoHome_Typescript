import { Link } from 'react-router-dom'
import PopHover from '../PopHover'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCS, setIsOpenCS] = useState(false)
  const { onSubmitSearch, register } = useSearchProducts()
  // gọi API lấy giỏ hàng trong Cart và phải là user đã Login || Register
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesAPI.getPurchase({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const toggleDropdownCS = () => {
    setIsOpenCS(!isOpenCS)
  }
  const respurchasesInCart = purchasesInCartData && purchasesInCartData?.data.data
  const purchasesInCart = respurchasesInCart && respurchasesInCart.filter((item) => item.product !== null)

  return (
    // <div className='bg-orange text-dark'>
    //   <div className='container'>
    //     <NavHeader />
    //     <div className='grid grid-cols-12 items-end gap-3 lg:gap-5'>
    //       <Link to={path.home} className='col-span-3 lg:col-span-2'>
    //         <img
    //           className='mb-2 h-full w-full rounded-md bg-white object-cover py-2 shadow-lg lg:px-4 lg:py-0'
    //           src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=819.000032544136,fit=crop/YbNbPPqn2EfwxjP7/chat-hon-to-cu-1-png-m7V2704oB7HDV1b2.png'
    //           alt='Goomo Home logo'
    //           data-v-fb585256
    //           data-qa='builder-siteheader-img-logo'
    //         />
    //       </Link>
    //       <form className='col-span-7 mb-2 shadow-lg md:col-span-8 md:mb-2 lg:col-span-8' onSubmit={onSubmitSearch}>
    //         <div className='relative flex rounded-sm bg-white text-[10px] capitalize  md:text-xs lg:text-sm'>
    //           <input
    //             type='text'
    //             placeholder='Tìm sản phẩm'
    //             className=' flex-grow border-none bg-transparent px-3 py-2 text-gray-600 outline-none md:py-3'
    //             {...register('searchProduct')}
    //           />
    //           <button className='absolute right-0 top-0 rounded-sm bg-gray-300 px-3 py-2 text-orange hover:opacity-90 md:px-7 md:py-3 lg:px-10 lg:py-3'>
    //             <svg
    //               xmlns='http://www.w3.org/2000/svg'
    //               fill='none'
    //               viewBox='0 0 24 24'
    //               strokeWidth={1.5}
    //               stroke='currentColor'
    //               className='h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5'
    //             >
    //               <path
    //                 strokeLinecap='round'
    //                 strokeLinejoin='round'
    //                 d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
    //               />
    //             </svg>
    //           </button>
    //         </div>
    //       </form>
    //       <div className='cols-span-1 justify-self-center'>
    //         <PopHover
    //           renderPopHover={
    //             <div className='relative max-w-[400px] rounded-md border border-gray-200 bg-white text-[8px] capitalize shadow-lg md:text-sm lg:text-sm'>
    //               {purchasesInCart && purchasesInCart.length > 0 ? (
    //                 <div className='p-2'>
    //                   <div className='capitalize text-gray-400'>sản phẩm mới thêm</div>
    //                   <div className='mt-5'>
    //                     {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
    //                       <div key={purchase._id}>
    //                         {purchase.product !== null && (
    //                           <div className='mt-2 flex py-2 hover:bg-slate-200'>
    //                             <div className='flex-shrink-0'>
    //                               <img
    //                                 src={purchase.product.image}
    //                                 alt={purchase.product.name}
    //                                 className='h-11 w-11 object-cover'
    //                               />
    //                             </div>
    //                             <div className='ml-2 flex-grow overflow-hidden'>
    //                               <div className='truncate'>{purchase.product?.name}</div>
    //                             </div>
    //                             <div className='ml-2 flex-shrink-0'>
    //                               <span className='text-orange'>
    //                                 ₫
    //                                 {purchase.product?.price !== 0
    //                                   ? formatCurrency(purchase.product?.price)
    //                                   : formatCurrency(purchase.product?.price_before_discount)}
    //                               </span>
    //                             </div>
    //                           </div>
    //                         )}
    //                       </div>
    //                     ))}
    //                   </div>
    //                   <div className='mt-6 flex items-center justify-between'>
    //                     <div className='text-xs capitalize text-gray-500'>
    //                       {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} sản
    //                       phẩm giỏ hàng
    //                     </div>
    //                     <Link
    //                       to={path.cart}
    //                       className='rounded-sm bg-orange px-4 py-2 capitalize text-dark hover:opacity-80'
    //                     >
    //                       Xem giỏ hàng
    //                     </Link>
    //                   </div>
    //                 </div>
    //               ) : (
    //                 <div className='flex h-[300px] w-[300px] flex-col items-center '>
    //                   <img src={noproduct} alt='No Products' className='h-30 w-30' />
    //                   <div className='mt-3 capitalize'> Chưa có sản phẩm trong giỏ hàng</div>
    //                   {!isAuthenticated && (
    //                     <div className=' mt-5 flex items-center justify-center'>
    //                       <Link to={path.verifyEmail} className='rounded-sm bg-slate-200 px-3 py-2 hover:bg-slate-400'>
    //                         Đăng kí
    //                       </Link>
    //                       <Link to={path.login} className='ml-4 rounded-sm bg-slate-200 px-3 py-2 hover:bg-slate-400'>
    //                         Đăng nhập
    //                       </Link>
    //                     </div>
    //                   )}
    //                 </div>
    //               )}
    //             </div>
    //           }
    //         >
    //           <Link to={path.cart} className='relative'>
    //             <svg
    //               xmlns='http://www.w3.org/2000/svg'
    //               fill='none'
    //               viewBox='0 0 24 24'
    //               strokeWidth={1.5}
    //               stroke='currentColor'
    //               className='m-1 h-8 w-8 p-1 md:h-10 md:w-10 lg:h-12 lg:w-12'
    //             >
    //               <path
    //                 strokeLinecap='round'
    //                 strokeLinejoin='round'
    //                 d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
    //               />
    //             </svg>
    //             {purchasesInCart && purchasesInCart.length > 0 && (
    //               <span className='absolute left-[25px] top-[-2px] rounded-full bg-white px-[10px] py-[2px] text-xs text-orange'>
    //                 {purchasesInCart?.length}
    //               </span>
    //             )}
    //           </Link>
    //         </PopHover>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <nav className=' text-dark border-gray-200 bg-orange/60 dark:bg-gray-900 '>
      <NavHeader />
      <div className=' mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <div className='flex items-center space-x-3 md:order-2 md:space-x-0'>
          <button
            data-collapse-toggle='navbar-user'
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-user'
            aria-expanded={isOpen}
            onClick={toggleDropdown}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-8 w-8'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>
        <Link to={path.home} className='flex items-center space-x-0 rounded-lg bg-slate-100'>
          <img
            className='h-16 md:h-24'
            src='https://res.cloudinary.com/drcutfii2/image/upload/v1718517381/logo_avdjaf.jpg'
            alt='Goomo Home logo'
            data-v-fb585256
            data-qa='builder-siteheader-img-logo'
          />
        </Link>
        <form className='hidden w-3/5 shadow-lg md:block' onSubmit={onSubmitSearch}>
          <div className='relative flex rounded-sm bg-white text-[10px] capitalize  md:text-xs lg:text-sm'>
            <input
              type='text'
              placeholder='Tìm sản phẩm'
              className=' flex-grow border-none bg-transparent px-3 py-2 text-gray-600 outline-none md:py-3'
              {...register('searchProduct')}
            />
            <button className='absolute right-0 top-0 rounded-sm bg-gray-300 px-3 py-2 text-orange hover:opacity-90 md:px-7 md:py-3 lg:px-10 lg:py-3'>
              <svg
                xmlns='http:www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5'
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
        <div className='block'>
          <PopHover
            renderPopHover={
              <div className='relative max-w-[400px] rounded-md border border-gray-200 bg-white text-[8px] capitalize shadow-lg md:text-sm lg:text-sm'>
                {purchasesInCart && purchasesInCart.length > 0 ? (
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                        <div key={purchase._id}>
                          {purchase.product !== null && (
                            <div className='mt-2 flex py-2 hover:bg-slate-200'>
                              <div className='flex-shrink-0'>
                                <img
                                  src={purchase.product.image}
                                  alt={purchase.product.name}
                                  className='h-11 w-11 object-cover'
                                />
                              </div>
                              <div className='ml-2 flex-grow overflow-hidden'>
                                <div className='truncate'>{purchase.product?.name}</div>
                              </div>
                              <div className='ml-2 flex-shrink-0'>
                                <span className='text-orange'>
                                  ₫
                                  {purchase.product?.price !== 0
                                    ? formatCurrency(purchase.product?.price)
                                    : formatCurrency(purchase.product?.price_before_discount)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-500'>
                        {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} sản phẩm
                        giỏ hàng
                      </div>
                      <Link
                        to={path.cart}
                        className='text-dark rounded-sm bg-orange px-4 py-2 capitalize hover:opacity-80'
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
                        <Link to={path.verifyEmail} className='rounded-sm bg-slate-200 px-3 py-2 hover:bg-slate-400'>
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
            <Link to={path.cart} className='relative'>
              <svg
                xmlns='http:www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='m-1 h-10 w-10 p-1 md:h-10 md:w-10 lg:h-12 lg:w-12'
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

        <div className='w-full items-center justify-between md:order-1 md:flex md:w-auto' id='navbar-user'>
          {isOpen && (
            <ul className=' mt-4 flex flex-col space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900'>
              <li>
                <Link
                  to={path.gt}
                  className='text-dark  flex rounded px-3 py-2 md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                    />
                  </svg>

                  <span className='mx-1 text-sm lg:text-sm'>Giới Thiệu</span>
                </Link>
              </li>
              <li>
                <Link
                  to={path.blog}
                  className='dark:text-dark  dark:hover:text-dark flex rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9'
                    />
                  </svg>

                  <span className='text-sm '>Tin Tức</span>
                </Link>
              </li>
              <li>
                <button
                  className='text-dark flex  w-full rounded px-3 py-2 text-sm md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500 lg:text-sm'
                  onClick={toggleDropdownCS}
                >
                  <span>Chính Sách</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </button>
                {isOpenCS && (
                  <>
                    <Link to={path.cs1} className='ml-10 flex py-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mr-2 h-3 w-3'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                        />
                      </svg>
                      <span>Chính sách bảo hành</span>
                    </Link>
                    <Link to={path.cs2} className='ml-10 mt-2  flex py-1'>
                      {' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mr-2 h-3 w-3'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                        />
                      </svg>
                      <span>Chính sách bảo mật thông tin</span>
                    </Link>
                    <Link to={path.cs3} className='ml-10 mt-2  flex py-1'>
                      {' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mr-2 h-3 w-3'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                        />
                      </svg>
                      <span>Chính sách đổi trả hoàn tiền</span>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
