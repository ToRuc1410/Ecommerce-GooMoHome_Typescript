import { Link } from 'react-router-dom'
import NavHeader from '../NavHeader'
import path from 'src/constants/path'
// import useSearchProducts from 'src/hooks/useSearchProducts'

export default function CheckoutHeader() {
  // const { onSubmitSearch, register } = useSearchProducts()
  return (
    <div className='border border-b-black/20 '>
      <div className='bg-orange text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='flex flex-wrap justify-start px-4 py-2 lg:justify-start'>
            <Link to={path.home} className='float-left flex flex-wrap'>
              <div>
                <img
                  className='h-6 md:h-8 lg:h-11'
                  src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=819.000032544136,fit=crop/YbNbPPqn2EfwxjP7/chat-hon-to-cu-1-png-m7V2704oB7HDV1b2.png'
                  alt='Goomo Home logo'
                  data-v-fb585256
                  data-qa='builder-siteheader-img-logo'
                />
              </div>
              <div className='mx-4 h-8 w-[1px] bg-orange' />
              <div className='text-sm text-orange lg:text-xl'> Thanh Toán</div>
            </Link>
            {/* <form className='w-[50%] shadow-md' onSubmit={onSubmitSearch}>
              <div className='relative h-full w-full flex-grow rounded-sm border border-slate-200 bg-white '>
                <input
                  type='text'
                  placeholder='Free Ship nội thành phố Hồ Chí Minh'
                  className='h-full w-full border-none bg-transparent px-2 py-2 text-[9px] text-gray-600 outline-none md:text-xs'
                  {...register('searchProduct')}
                />
                <button className=' absolute right-0 top-0 rounded-sm bg-gray-300 px-3 py-1 text-orange hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6 md:h-6 md:w-6 lg:h-9 lg:w-9'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form> */}
          </nav>
        </div>
      </div>
    </div>
  )
}
