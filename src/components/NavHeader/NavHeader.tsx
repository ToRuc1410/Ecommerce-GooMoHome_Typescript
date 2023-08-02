import { useContext } from 'react'
import PopHover from '../PopHover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchaseStatus'
import { getAvatarUrl } from 'src/utils/FuncFormat'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  // gọi API Logout và xóa đi giỏ hàng trong Cart
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-between pt-1 text-[11px] md:text-sm lg:text-sm'>
      <Link to={path.gt} className='flex py-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='hidden md:block md:h-5 md:w-5 lg:block lg:h-5 lg:w-5 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
          />
        </svg>

        <span className='mx-1 text-sm lg:text-sm'>Giới Thiệu</span>
      </Link>
      <Link to={path.blog} className='flex py-1'>
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

        <span className='text-sm lg:text-sm'>Tin Tức</span>
      </Link>
      <PopHover
        className=' flex cursor-pointer items-center hover:text-white/70'
        renderPopHover={
          <div className='relative rounded-md border border-gray-200 bg-white text-[8px] capitalize shadow-lg md:text-sm lg:text-sm'>
            <div className=' flex flex-col py-1 pl-2 pr-6'>
              <Link to={path.cs1} className='flex items-center py-1 hover:text-orange'>
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
              <Link to={path.cs2} className='mt-2 flex items-center py-1 hover:text-orange'>
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
              <Link to={path.cs3} className='mt-2 flex items-center py-1 hover:text-orange'>
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
            </div>
          </div>
        }
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
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1 text-sm lg:text-sm'>Chính Sách</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </PopHover>
      {/* nếu đăng nhập hay đăng kí thành công mới cho hiện tài khoảng  */}
      {isAuthenticated && (
        <PopHover
          className='mx-3 ml-6 flex cursor-pointer items-center hover:text-white/70 '
          renderPopHover={
            <div className='relative rounded-md border border-gray-200 bg-white text-[8px] shadow-lg md:text-sm lg:text-sm'>
              <Link
                to={path.profile}
                className='block w-full bg-white py-3 text-left hover:bg-slate-100 hover:text-cyan-500 '
              >
                Tài khoảng của Tôi
              </Link>
              <Link
                to={path.orderDetail}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 '
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 '
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-7 w-7 flex-shrink-0'>
            <img
              // src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
              src={getAvatarUrl(profile?.avatar)}
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='hidden md:block lg:block'> {profile?.name ? profile.name : profile?.email}</div>
        </PopHover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center text-[8px] capitalize md:text-sm lg:text-sm'>
          <Link to={path.verifyEmail} className='mx-3 capitalize hover:text-white/70'>
            Đăng kí
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
