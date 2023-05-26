import { Link } from 'react-router-dom'
import path from 'src/constants/path'

import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/FuncFormat'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='mx-2 text-[8px] md:text-xs lg:text-sm'>
      <div className='flex flex-wrap items-center justify-center py-2'>
        <Link to={path.profile} className='h-6 w-6 flex-shrink-0 border-collapse overflow-hidden rounded-full  '>
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-2'>
          <div className='truncate font-bold text-gray-500'>{profile?.name || profile?.email}</div>
          <Link to={path.profile} className='mt-1 flex items-center capitalize'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            <div className='text-gray-400'>Sửa hồ sơ</div>
          </Link>
        </div>
      </div>
      <div className='mt-3 text-[8px] md:mt-6 md:text-sm lg:mt-7 lg:text-sm'>
        <Link to={path.profile} className='flex items-start capitalize transition-colors'>
          <div className='h-[22px] w-[22px] '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          </div>
          <div className=''>Tài khoảng của tôi</div>
        </Link>
        <Link to={path.historyPurchase} className='my-3 flex items-center capitalize transition-colors lg:my-6'>
          <div className=' h-[22px] w-[22px] '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
          <div className=''>Đơn mua</div>
        </Link>
        <Link to={path.changePassword} className='flex items-center capitalize transition-colors'>
          <div className=' h-[22px] w-[22px] '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
              />
            </svg>
          </div>
          <div className=''>Đổi mật Khẩu</div>
        </Link>
      </div>
    </div>
  )
}
