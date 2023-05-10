export default function Footer() {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>Chú ý: 01 tấm sàn nặng khoảng 500gr, 1m2 (07 tấm) nặng khoảng 3,5kg nên phí vận chuyển khá cao.</div>
          </div>
          <div className='lg:col-span-2'>
            Anh chị có thể liên hệ với shop theo <u>SĐT 0987168795</u> để được tư vấn về việc vận chuyển.
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div>Thời gian làm việc: 8:00am - 20:00pm</div>
          <div className='mt-2'>Liên hệ: 0968835592 (zalo)</div>
          <div className='mt-2'>Gmail: goomohome@gmail.com</div>
          <div className='mt-2'>Trụ sở Hà Nội: 330 Trịnh Đình Cử, Định Công, Hoàng Mai, HÀ Nội</div>
          <div className='mt-2'>Trụ Sở TP.HCM: 30 Đường Số 50, Phường Tân Tạo, Quận Bình Tân, TP.HCM</div>
        </div>
      </div>
    </footer>
  )
}
