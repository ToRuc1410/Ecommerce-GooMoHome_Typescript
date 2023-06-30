import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function Footer() {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-4'>
            <div className='py-5 font-serif text-lg'>Thông Tin Liên Hệ </div>
            <div className='pl-10'>
              <div>Thời gian làm việc: 8:00am - 20:00pm</div>
              <div className='mt-2'>Liên hệ: 0968835592 (zalo)</div>
              <div className='mt-2'>Gmail: goomohome@gmail.com</div>
              <div className='mt-2'>Trụ sở Hà Nội: 330 Trịnh Đình Cử, Định Công, Hoàng Mai, HÀ Nội</div>
              <div className='mt-2'>Trụ Sở TP.HCM: 30 Đường Số 50, Phường Tân Tạo, Quận Bình Tân, TP.HCM</div>
            </div>
          </div>
          <div className='col-span-4 pl-10'>
            <div className='py-5 font-serif text-lg'>Hướng Dẫn</div>
            <div className='pl-5'>
              <div className='py-4'>
                <Link to={path.cs1} className=' py-2 hover:text-orange'>
                  Chính sách bảo hành
                </Link>
              </div>
              <div className='py-4'>
                <Link to={path.cs2} className='mt-2  py-2 hover:text-orange'>
                  Chính sách bảo mật thông tin
                </Link>
              </div>
              <div className='py-4'>
                <Link to={path.cs3} className='mt-2  py-2 hover:text-orange'>
                  Chính sách đổi trả hoàn tiền
                </Link>
              </div>
            </div>
          </div>
          <div className='col-span-4'>
            <div className='py-5 font-serif text-lg'>Về Chúng Tôi</div>
            <div className='pl-5'>
              <div className='py-4'>Trụ Sở TP. HCM Gọi : 0968.835.592</div>

              <div className='py-4'>Trụ Sở Hà Nội Gọi : 0968.835.592</div>
              <div className='py-4'>Liên Hệ: goomohome@gmail.com</div>
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
