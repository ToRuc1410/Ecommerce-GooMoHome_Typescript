import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function Footer() {
  return (
    <footer className='bg-neutral-100 lg:py-16'>
      <div className='container'>
        <div className='grid grid-cols-12 lg:gap-6'>
          <div className='col-span-3'>
            <div className='pt-5 text-[10px] font-thin md:text-sm lg:text-lg'>Thông Tin Liên Hệ </div>
            <div className='text-[8px] md:text-sm lg:pl-10 lg:text-sm'>
              <div>Thời gian làm việc: 8:00am - 20:00pm</div>
              <div className='mt-4'>Liên hệ: 0968835592 (zalo)</div>
              <div className='mt-4'>Gmail: goomohome@gmail.com</div>
              <div className='mt-4'>Trụ sở Hà Nội: 330 Trịnh Đình Cử, Định Công, Hoàng Mai, HÀ Nội</div>
              <div className='mt-4'>Trụ Sở TP.HCM: 30 Đường Số 50, Phường Tân Tạo, Quận Bình Tân, TP.HCM</div>
            </div>
          </div>
          <div className='col-span-3 lg:pl-10'>
            <div className='ml-1 pt-5 text-[10px] font-thin md:text-sm lg:text-lg'>Hướng Dẫn</div>
            <div className='lg:pl-5'>
              <div className='flex items-center text-[10px] font-thin md:text-sm lg:py-2 lg:text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
                <Link to={path.cs1} className=' text-[8px] font-thin hover:text-orange md:text-sm lg:py-2 lg:text-sm'>
                  Chính sách bảo hành
                </Link>
              </div>
              <div className='flex items-center text-[10px] font-thin md:text-sm lg:py-2 lg:text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
                <Link
                  to={path.cs2}
                  className='mt-2  text-[8px] font-thin hover:text-orange md:text-sm lg:py-2 lg:text-sm'
                >
                  Chính sách bảo mật thông tin
                </Link>
              </div>
              <div className='flex items-center py-2 text-[10px] font-thin md:text-sm lg:text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
                <Link
                  to={path.cs3}
                  className='text-[8px]  font-thin hover:text-orange md:text-sm lg:mt-2 lg:py-2 lg:text-sm'
                >
                  Chính sách đổi trả hoàn tiền
                </Link>
              </div>
            </div>
          </div>
          <div className='col-span-3'>
            <div className='pt-5 text-[10px] font-thin md:text-sm lg:text-lg'>Về Chúng Tôi</div>
            <div className='text-[8px] font-thin md:text-sm lg:pl-5 lg:text-sm'>
              <p className='lg:py-2'>Trụ Sở TP. HCM Gọi : 0968.835.592</p>

              <p className='lg:py-2'>Trụ Sở Hà Nội Gọi : 0968.835.592</p>
            </div>
          </div>
          <div className='col-span-3 pb-5'>
            <div className='flex pt-5'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Sản phẩm chất lượng Sàn gỗ được tuyển chọn kĩ lưỡng, tỷ lệ đồng màu đạt trên 90% đối với gỗ tự nhiên
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm '>
                Hỗ Trợ Giao hàng Chúng tôi hỗ trợ giao hàng với những đơn hàng khách hàng yêu cầu thi công từ 50m2 và
                trong bán kính 30km nội thành HCM.
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Dịch vụ khách hàng Chúng tôi luôn có những chính sách tốt nhất dành cho khách hàng thân thiết.
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-14 md:w-14 lg:h-16 lg:w-16'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Mẫu mã đa dạng Liên tục cho ra những sản phẩm đẹp nhất, nhằm đáp ứng mọi nhu cầu khách hàng.
              </span>
            </div>
          </div>
        </div>
        {/* <div className='mt-10 text-center text-sm'>
            Anh chị có thể liên hệ với shop theo <u>SĐT 0987168795</u> để được tư vấn về việc vận chuyển.
          <div>Thời gian làm việc: 8:00am - 20:00pm</div>
          <div className='mt-2'>Liên hệ: 0968835592 (zalo)</div>
          <div className='mt-2'>Gmail: goomohome@gmail.com</div>
          <div className='mt-2'>Trụ sở Hà Nội: 330 Trịnh Đình Cử, Định Công, Hoàng Mai, HÀ Nội</div>
          <div className='mt-2'>Trụ Sở TP.HCM: 30 Đường Số 50, Phường Tân Tạo, Quận Bình Tân, TP.HCM</div>
        </div> */}
      </div>
    </footer>
  )
}
