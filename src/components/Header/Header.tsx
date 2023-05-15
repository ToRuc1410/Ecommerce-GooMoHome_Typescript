import { Link } from 'react-router-dom'
import PopHover from '../PopHover'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='bg-orange pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <PopHover
            className='ml-6 flex cursor-pointer items-center hover:text-white/70'
            renderPopHover={
              <div className='relative rounded-md border border-gray-200 bg-white shadow-lg'>
                <div className='flex flex-col py-1 pl-2 pr-28 text-sm'>
                  <button className='px-4 py-2 hover:text-orange'> Tiếng Việt </button>
                  <button className='mt-2 px-4 py-2 hover:text-orange'> EngLish </button>
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
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1 text-sm'>Tiếng việt</span>
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
              className='mx-3 ml-6 flex cursor-pointer items-center py-3 hover:text-white/70'
              renderPopHover={
                <div className='relative rounded-md border border-gray-200 bg-white shadow-lg'>
                  <Link
                    to={path.profile}
                    className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 '
                  >
                    Tài khoảng của Tôi
                  </Link>
                  <Link
                    to={path.home}
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
                  src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <div> {profile?.email}</div>
            </PopHover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center text-sm'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                Đăng kí
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40' />
              <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
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
          <form className='col-span-8 shadow-lg'>
            <div className='relative flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                placeholder='Free Ship nội thành phố Hồ Chí Minh'
                className=' flex-grow border-none bg-transparent px-3 py-2 text-gray-600 outline-none'
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
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/961b1b8080d2a14a7b848e7f35a82127_tn'
                            alt='Cart'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Áo Polo Nam CHALK ATINO phối sọc vải cá sấu Cotton cao cấp sang trọng lịch lãm chuẩn form
                            PL2.3074
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫99.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/961b1b8080d2a14a7b848e7f35a82127_tn'
                            alt='Cart'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Áo Polo Nam CHALK ATINO phối sọc vải cá sấu Cotton cao cấp sang trọng lịch lãm chuẩn form
                            PL2.3074
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫99.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/961b1b8080d2a14a7b848e7f35a82127_tn'
                            alt='Cart'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Áo Polo Nam CHALK ATINO phối sọc vải cá sấu Cotton cao cấp sang trọng lịch lãm chuẩn form
                            PL2.3074
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫99.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/961b1b8080d2a14a7b848e7f35a82127_tn'
                            alt='Cart'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Áo Polo Nam CHALK ATINO phối sọc vải cá sấu Cotton cao cấp sang trọng lịch lãm chuẩn form
                            PL2.3074
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫99.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/961b1b8080d2a14a7b848e7f35a82127_tn'
                            alt='Cart'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Áo Polo Nam CHALK ATINO phối sọc vải cá sấu Cotton cao cấp sang trọng lịch lãm chuẩn form
                            PL2.3074
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫99.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-500'>thêm hàng vào giỏ</div>
                      <button className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:opacity-80'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to={path.home}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-12 w-12 p-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </Link>
            </PopHover>
          </div>
        </div>
      </div>
    </div>
  )
}
